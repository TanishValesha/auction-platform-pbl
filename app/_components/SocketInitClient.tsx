"use client";

import { useEffect } from "react";

export default function SocketInitClient() {
  useEffect(() => {
    fetch("/api/socket");
  }, []);

  return null;
}
