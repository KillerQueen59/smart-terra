/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  FeatureGroup,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  GeoJSON,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { ChevronLeftOutline } from "heroicons-react";
import { useRouter } from "next/navigation";
import { DefaultBoundary } from "@/dummy/DefaultBoundary";
import {
  resultRendah,
  resultBerat,
  resultSedang,
  resultSangatRendah,
  resultSangatBerat,
} from "@/dummy/DummyResult";

const TiffMap = () => {
  const router = useRouter();
  const mapRef = React.useRef<any>();
  const [tiffLayers, setTiffLayers] = useState<any[]>([]);
  const fileInputRef = React.useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aws, setAWS] = useState<any[]>([]);
  const [awl, setAWL] = useState<any[]>([]);
  const [isResult, setIsResult] = useState(false);

  // Result layer visibility states
  const [showSangatTinggi, setShowSangatTinggi] = useState(true);
  const [showTinggi, setShowTinggi] = useState(true);
  const [showSedang, setShowSedang] = useState(true);
  const [showRendah, setShowRendah] = useState(true);
  const [showSangatRendah, setShowSangatRendah] = useState(true);

  // Fix for leaflet default icons in Next.js - moved to useEffect
  useEffect(() => {
    if (typeof window !== "undefined") {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "/marker.svg",
        iconUrl: "/marker.svg",
        shadowUrl: null,
      });
    }
  }, []);

  const getAWSData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/aws");
      const res = await response.json();
      console.log("AWS Response:", res);

      if (res?.data) {
        setAWS(
          res.data.filter((x: any) => {
            const lat = Number(x.latitude);
            const lng = Number(x.longitude);
            return !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0;
          })
        );
      }
    } catch (error) {
      console.error("Error fetching AWS data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getAWLData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/awl");
      const res = await response.json();
      console.log("AWL Response:", res);

      if (res?.data) {
        setAWL(
          res.data.filter((x: any) => {
            const lat = Number(x.latitude);
            const lng = Number(x.longitude);
            return !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0;
          })
        );
      }
    } catch (error) {
      console.error("Error fetching AWL data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  console.log("AWS Data:", aws);
  console.log("AWL Data:", awl);

  // Separate markers by device type for better display
  const awsMarkers = aws.filter((device: any) => "sensor" in device);
  const awlMarkers = awl.filter(
    (device: any) => "data" in device && "type" in device
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processTiffFiles(files);
  };

  const processTiffFiles = async (files: File[]) => {
    const layers = await Promise.all(
      files.map((file) => {
        return new Promise(async (resolve) => {
          const reader = new FileReader();
          reader.onload = async (e: any) => {
            const arrayBuffer = e.target.result;
            try {
              // Dynamic import to avoid Turbopack issues
              const [georaster, GeoRasterLayer] = await Promise.all([
                import("georaster").then((mod) => mod.default),
                import("georaster-layer-for-leaflet").then(
                  (mod) => mod.default
                ),
              ]);

              const raster = await georaster(arrayBuffer);
              const geoRasterLayer = new GeoRasterLayer({
                georaster: raster,
                opacity: 0.7,
                resolution: 256,
              });

              // Add layer to map if it exists
              if (mapRef.current) {
                geoRasterLayer.addTo(mapRef.current);
                const bounds = geoRasterLayer.getBounds();
                resolve({ id: file.name, layer: geoRasterLayer, bounds });
              }
            } catch (error) {
              console.error("Error processing TIFF:", error);
              alert("Failed to load TIFF file. Please check the format.");
              resolve(null);
            }
          };
          reader.readAsArrayBuffer(file);
        });
      })
    );

    const validLayers = layers.filter((layer) => layer !== null) as any[];
    setTiffLayers((prevLayers) => [...prevLayers, ...validLayers]);

    if (mapRef.current && validLayers.length > 0) {
      const boundsList = validLayers.map((layer) => layer.bounds);
      const combinedBounds = L.latLngBounds(boundsList);
      mapRef.current.fitBounds(combinedBounds);
    }
  };

  const removeLayer = (id: string) => {
    setTiffLayers((prevLayers) => {
      const layerToRemove = prevLayers.find((layer) => layer.id === id);
      if (layerToRemove && mapRef.current) {
        mapRef.current.removeLayer(layerToRemove.layer);
      }
      return prevLayers.filter((layer) => layer.id !== id);
    });
  };

  useEffect(() => {
    getAWSData();
    getAWLData();
  }, [getAWSData, getAWLData]);

  return (
    <div className="relative text-gray-60">
      {/* Enhanced Control Panel */}
      <div
        className="absolute z-50 p-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 overflow-y-auto"
        style={{
          top: "20px",
          left: "20px",
          minWidth: "320px",
          maxWidth: "400px",
          maxHeight: "calc(100vh - 40px)",
        }}>
        {/* Header */}
        <div
          className="flex items-center space-x-3 mb-6 hover:bg-gray-50 p-2 rounded-lg cursor-pointer transition-colors"
          onClick={() => {
            router.replace("/dashboard");
          }}>
          <ChevronLeftOutline
            className={"h-5 w-5 text-gray-600"}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <span className="text-sm font-medium text-gray-700">
            Back to Dashboard
          </span>
        </div>

        <div className="border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Analisis Efisiensi Pemupukan
          </h1>
          <p className="text-sm text-gray-600">
            Interactive geospatial analysis
          </p>
        </div>

        {/* File Upload Section */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Upload Additional Layers
          </h3>
          <div className="relative">
            <input
              type="file"
              accept=".tiff,.tif"
              onChange={handleFileChange}
              multiple
              className="hidden"
              ref={fileInputRef}
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center w-full p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
              <div className="text-center">
                <div className="text-2xl mb-2">📁</div>
                <div className="text-sm text-gray-600">Choose TIFF files</div>
              </div>
            </label>
          </div>
        </div>

        {/* Data Status */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Data Status
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium">AWS Stations</span>
              </div>
              <span className="text-sm bg-green-100 px-2 py-1 rounded">
                {awsMarkers.length} devices
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm font-medium">AWL Stations</span>
              </div>
              <span className="text-sm bg-blue-100 px-2 py-1 rounded">
                {awlMarkers.length} devices
              </span>
            </div>
            <div className="text-xs text-gray-500 text-center pt-2">
              Total: {awsMarkers.length + awlMarkers.length} monitoring devices
            </div>
          </div>
        </div>

        {/* Layers Management */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700">
            Layer Management
          </h3>

          {/* TIFF Layers */}
          {tiffLayers.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
                Added Layers ({tiffLayers.length})
              </h4>
              <div className="space-y-2">
                {tiffLayers.map((layer) => (
                  <div
                    key={layer.id}
                    className="flex items-center justify-between p-2 bg-white rounded border">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span
                        className="text-sm font-medium truncate"
                        title={layer.id}>
                        {layer.id}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        if (fileInputRef?.current) {
                          fileInputRef.current.value = null;
                        }
                        removeLayer(layer.id);
                      }}
                      className="px-2 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded transition-colors">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Result Controls */}
          <div className="flex space-x-2">
            {tiffLayers.length == 2 && !isResult && (
              <button
                onClick={() => setIsResult(true)}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                Show Analysis Result
              </button>
            )}
            {isResult && (
              <button
                onClick={() => setIsResult(false)}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors">
                Hide Result
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Analysis Result Layers Panel - Top Right */}
      {isResult && (
        <div
          className="absolute z-50 p-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200"
          style={{
            top: "20px",
            right: "20px",
            minWidth: "280px",
            maxWidth: "320px",
          }}>
          <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-4">
            Analysis Result Layers
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-700">
                  Sangat Tinggi (80 - 100%)
                </span>
              </div>
              <button
                onClick={() => setShowSangatTinggi(!showSangatTinggi)}
                className={`w-8 h-4 rounded-full transition-colors ${
                  showSangatTinggi ? "bg-green-500" : "bg-gray-300"
                }`}>
                <div
                  className={`w-3 h-3 bg-white rounded-full transition-transform ${
                    showSangatTinggi ? "translate-x-4" : "translate-x-0"
                  }`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: "#b7de1b" }}></div>
                <span className="text-sm text-gray-700">Tinggi (60 - 80%)</span>
              </div>
              <button
                onClick={() => setShowTinggi(!showTinggi)}
                className="w-8 h-4 rounded-full transition-colors"
                style={{
                  backgroundColor: showTinggi ? "#b7de1b" : "#d1d5db",
                }}>
                <div
                  className={`w-3 h-3 bg-white rounded-full transition-transform ${
                    showTinggi ? "translate-x-4" : "translate-x-0"
                  }`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: "#a4a832" }}></div>
                <span className="text-sm text-gray-700">Sedang (40 - 60%)</span>
              </div>
              <button
                onClick={() => setShowSedang(!showSedang)}
                className="w-8 h-4 rounded-full transition-colors"
                style={{
                  backgroundColor: showSedang ? "#a4a832" : "#d1d5db",
                }}>
                <div
                  className={`w-3 h-3 bg-white rounded-full transition-transform ${
                    showSedang ? "translate-x-4" : "translate-x-0"
                  }`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: "#db6b0f" }}></div>
                <span className="text-sm text-gray-700">Rendah (20 - 40%)</span>
              </div>
              <button
                onClick={() => setShowRendah(!showRendah)}
                className="w-8 h-4 rounded-full transition-colors"
                style={{
                  backgroundColor: showRendah ? "#db6b0f" : "#d1d5db",
                }}>
                <div
                  className={`w-3 h-3 bg-white rounded-full transition-transform ${
                    showRendah ? "translate-x-4" : "translate-x-0"
                  }`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: "#e62102" }}></div>
                <span className="text-sm text-gray-700">
                  Sangat Rendah (&lt; 20%)
                </span>
              </div>
              <button
                onClick={() => setShowSangatRendah(!showSangatRendah)}
                className="w-8 h-4 rounded-full transition-colors"
                style={{
                  backgroundColor: showSangatRendah ? "#e62102" : "#d1d5db",
                }}>
                <div
                  className={`w-3 h-3 bg-white rounded-full transition-transform ${
                    showSangatRendah ? "translate-x-4" : "translate-x-0"
                  }`}></div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Map */}
      {!isLoading && (
        <MapContainer
          style={{
            width: "100%",
            height: "100vh",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
          center={[-6.5597191, 106.7255352]}
          zoom={5}
          scrollWheelZoom={true}
          zoomControl={false}
          ref={mapRef}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          />
          <ZoomControl position="bottomright" />

          {/* Analysis Result Layers - conditionally rendered */}
          {isResult && showSangatTinggi && (
            <JSONResult data={resultSangatBerat} map={mapRef.current} />
          )}
          {isResult && showTinggi && (
            <JSONResult data={resultBerat} map={mapRef.current} />
          )}
          {isResult && showSedang && (
            <JSONResult data={resultSedang} map={mapRef.current} />
          )}
          {isResult && showRendah && (
            <JSONResult data={resultRendah} map={mapRef.current} />
          )}
          {isResult && showSangatRendah && (
            <JSONResult data={resultSangatRendah} map={mapRef.current} />
          )}

          {/* Always show markers regardless of data loading state */}
          {(awsMarkers.length > 0 || awlMarkers.length > 0) && (
            <NewMarkers markers={[...awsMarkers, ...awlMarkers]} />
          )}

          <GeoJSONBoundary data={DefaultBoundary} map={mapRef.current} />
        </MapContainer>
      )}
    </div>
  );
};

const JSONResult = ({ data, map }: any) => {
  const getFeatureStyle = (feature: any) => {
    let color;
    switch (feature.properties.Kelas_A) {
      case "Berat":
        color = "#b7de1b";
        break;
      case "Rendah":
        color = "#db6b0f";
        break;
      case "Sangat Berat":
        color = "#02ed22";
        break;
      case "Sedang":
        color = "#a4a832";
        break;
      case "Sangat Rendah":
        color = "#e62102";
        break;
      default:
        color = "gray";
    }

    return {
      color: color,
      weight: 0,
      opacity: 0,
      fillOpacity: 0.8,
      stroke: false,
    };
  };

  useEffect(() => {
    if (data && map) {
      const geoJsonLayer = L.geoJSON(data);
      const bounds = geoJsonLayer.getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds);
      }
    }
  }, [data, map]);

  return <GeoJSON data={data} style={getFeatureStyle} />;
};

const GeoJSONBoundary = ({ data, map }: any) => {
  useEffect(() => {
    if (data && map) {
      const geoJsonLayer = L.geoJSON(data);
      const bounds = geoJsonLayer.getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds);
      }
    }
  }, [data, map]);

  return (
    <GeoJSON
      data={data as any}
      style={{
        stroke: true,
        color: "#000000",
        fillColor: "transparent",
        weight: 2,
        opacity: 0.8,
      }}
    />
  );
};

const NewMarkers = ({ markers }: any) => {
  const groupRef = React.useRef<any>();

  // Enhanced marker icons with better visibility
  const icon = new L.Icon({
    iconUrl: "/marker.svg",
    iconSize: new L.Point(25, 30),
    iconAnchor: [12, 30],
    popupAnchor: [0, -30],
  });

  const iconAwl = new L.Icon({
    iconUrl: "/marker_awl.svg",
    iconSize: new L.Point(25, 30),
    iconAnchor: [12, 30],
    popupAnchor: [0, -30],
  });

  // Filter and validate markers
  const validMarkers =
    markers?.filter((x: any) => {
      const lat = Number(x.latitude);
      const lng = Number(x.longitude);
      const isValid = !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0;
      if (!isValid) {
        console.log("Invalid marker filtered out:", x);
      }
      return isValid;
    }) || [];

  return (
    <FeatureGroup ref={groupRef}>
      {validMarkers.map((x: any, i: number) => {
        const lat = Number(x.latitude);
        const lng = Number(x.longitude);

        // Determine device type based on model structure
        // AWS devices have 'sensor' field, AWL devices have 'data' and 'type' fields
        const isAWS = "sensor" in x;
        const isAWL = "data" in x && "type" in x;

        return (
          <Marker
            opacity={1}
            key={i}
            position={[lat, lng]}
            icon={isAWS ? icon : iconAwl}
            eventHandlers={{
              click: () => {
                console.log("Marker clicked:", x);
              },
            }}>
            <Popup>
              <div className="border border-solid border-gray-300 w-48 rounded-lg overflow-hidden">
                <div
                  className={`bg-gradient-to-r ${
                    isAWS
                      ? "from-red-500 to-red-600"
                      : "from-orange-500 to-orange-600"
                  } p-3 text-white`}>
                  <div className="font-bold text-lg">
                    {isAWS ? "AWS" : x.type || "AWL"} - {x.name}
                  </div>
                  <div className="text-sm opacity-90">{x.detailName}</div>
                </div>
                <div className="p-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Status:</span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        x.status === "active"
                          ? "bg-green-100 text-green-800"
                          : x.status === "alert"
                          ? "bg-yellow-100 text-yellow-800"
                          : x.status === "rusak"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                      {x.status}
                    </span>
                  </div>
                  {isAWS && (
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">
                        Sensors:
                      </span>
                      <span className="text-sm">{x.sensor}/8</span>
                    </div>
                  )}
                  {isAWL && (
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Type:</span>
                      <span className="text-sm">{x.type}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Battery:</span>
                    <span
                      className={`text-sm ${
                        x.battery > 50
                          ? "text-green-600"
                          : x.battery > 20
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}>
                      {x.battery}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                    <div>Lat: {lat.toFixed(6)}</div>
                    <div>Lng: {lng.toFixed(6)}</div>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </FeatureGroup>
  );
};

export default TiffMap;
