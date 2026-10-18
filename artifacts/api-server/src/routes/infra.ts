import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.get("/system/infra", (_req, res) => {
  // Generate slight realistic variation for live feeling telemetry
  const baseLatencyYYZ = 12 + Math.floor(Math.random() * 5);
  const baseLatencyLDN = 74 + Math.floor(Math.random() * 8);
  const baseLatencyTKY = 142 + Math.floor(Math.random() * 12);

  res.json({
    status: "OPERATIONAL",
    uptime: 99.98,
    latencies: {
      YYZ: baseLatencyYYZ,
      LDN: baseLatencyLDN,
      TKY: baseLatencyTKY,
    },
    services: [
      { name: "Content Delivery Network (Edge)", status: "OPTIMAL", ping: `${baseLatencyYYZ}ms` },
      { name: "AI Inference Cluster (Gemini)", status: "ONLINE", ping: `${baseLatencyYYZ + 4}ms` },
      { name: "PostgreSQL Database Engine", status: "HEALTHY", ping: "2ms" },
      { name: "Web Audio Synthesizer Node", status: "READY", ping: "< 1ms" },
    ],
    cpuLoad: Math.floor(18 + Math.random() * 10),
    memoryUsage: Math.floor(42 + Math.random() * 5),
  });
});

export default router;
