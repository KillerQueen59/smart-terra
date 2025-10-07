/* eslint-disable @typescript-eslint/no-explicit-any */
import { convertToLabelValue } from "@/shared/helper";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getAWLDashboard,
  getAWSDashboard,
  getTMATDashboard,
  getKebun,
  getPt,
} from "./DashboardData";

interface Options {
  label: string;
  value: string;
  ptId?: string;
  disabled?: boolean;
}

export const useDashboardImpl = () => {
  const [pt, setPt] = useState("");
  const [kebun, setKebun] = useState("");
  const [pts, setPts] = useState<Options[]>([]);
  const [kebuns, setKebuns] = useState<Options[]>([]);
  const [awlDashboards, setAwlDashboards] = useState([]);
  const [awsDashboards, setAwsDashboards] = useState([]);
  const [tmatDashboards, setTmatDashboards] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getPTData = useCallback(() => {
    setIsLoading(true);
    getPt()
      .then((res) => {
        if (res?.data) {
          const _pts = res.data
            .map((item: any) => ({
              label: item.name,
              value: item.name,
            }))
            .filter((item: any) => item.value !== "");

          setPts([
            {
              label: "All",
              value: "",
            },
            ..._pts,
          ]);
        }
      })
      .catch((error) => {
        console.error("Error fetching PT data:", error);
        setPts([{ label: "All", value: "" }]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getKebunData = useCallback((selectedPt?: string) => {
    setIsLoading(true);
    getKebun(selectedPt)
      .then((res) => {
        if (res?.data) {
          const _kebun = res.data
            .map((item: any) => ({
              label: item.name,
              value: item.name,
            }))
            .filter((item: any) => item.value !== "");
          setKebuns([
            {
              label: "All",
              value: "",
            },
            ..._kebun,
          ]);
        }
      })
      .catch((error) => {
        console.error("Error fetching Kebun data:", error);
        setKebuns([{ label: "All", value: "" }]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getDashboardData = useCallback(() => {
    setIsLoading(true);
    const filters = {
      pt: pt || undefined,
      kebun: kebun || undefined,
    };

    // Fetch AWL, AWS, and TMAT data simultaneously
    Promise.all([
      getAWLDashboard(filters),
      getAWSDashboard(filters),
      getTMATDashboard(filters),
    ])
      .then(([awlRes, awsRes, tmatRes]) => {
        if (awlRes?.data) {
          setAwlDashboards(awlRes.data);
        } else {
          setAwlDashboards([]);
        }
        if (awsRes?.data) {
          setAwsDashboards(awsRes.data);
        } else {
          setAwsDashboards([]);
        }
        if (tmatRes?.data) {
          setTmatDashboards(tmatRes.data);
        } else {
          setTmatDashboards([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
        setAwlDashboards([]);
        setAwsDashboards([]);
        setTmatDashboards([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pt, kebun]);

  // Separate dashboard data for AWL and AWS
  const awlDashboard = useMemo(() => {
    if (awlDashboards.length > 0) {
      return convertToLabelValue(awlDashboards, kebun);
    }
    return [];
  }, [awlDashboards, kebun]);

  const awsDashboard = useMemo(() => {
    if (awsDashboards.length > 0) {
      return convertToLabelValue(awsDashboards, kebun);
    }
    return [];
  }, [awsDashboards, kebun]);

  const tmatDashboard = useMemo(() => {
    if (tmatDashboards.length > 0) {
      return convertToLabelValue(tmatDashboards, kebun);
    }
    return [];
  }, [tmatDashboards, kebun]);

  // Handle PT change
  const handlePtChange = useCallback(
    (newPt: string) => {
      setPt(newPt);
      // Reset kebun when PT changes and reload kebun options
      setKebun("");
      getKebunData(newPt === "" ? undefined : newPt);
    },
    [getKebunData]
  );

  // Handle Kebun change
  const handleKebunChange = useCallback((newKebun: string) => {
    setKebun(newKebun);
  }, []);

  // Initial data load
  useEffect(() => {
    getPTData();
    getKebunData();
  }, [getPTData, getKebunData]);

  // Reload dashboard when filters change
  useEffect(() => {
    // Only fetch dashboard data after initial PT data is loaded
    if (pts.length > 0) {
      getDashboardData();
    }
  }, [pt, kebun, pts.length, getDashboardData]);

  return {
    pt,
    pts,
    kebun,
    kebuns,
    awlDashboard,
    awsDashboard,
    tmatDashboard,
    showModal,
    loading: isLoading,
    setShowModal,
    setPt: handlePtChange,
    setKebun: handleKebunChange,
  };
};
