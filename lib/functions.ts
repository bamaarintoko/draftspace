export function getErrorMessage(error: unknown): string {
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof (error as any).response === "object"
    ) {
      const res = (error as any).response;
      return res?.data?.error || res?.data?.message || "Terjadi kesalahan server.";
    }
  
    if (typeof error === "string") return error;
  
    return "Terjadi kesalahan. Silakan coba lagi.";
  }
  