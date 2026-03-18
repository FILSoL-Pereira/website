const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isRegistrationId(value: string) {
  return UUID_REGEX.test(value.trim());
}

export function buildCheckinQrValue(registrationId: string) {
  const id = registrationId.trim();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  const path = `/admin/checkin?id=${encodeURIComponent(id)}`;

  return siteUrl ? `${siteUrl}${path}` : path;
}

export function parseRegistrationIdFromQr(rawValue: string) {
  const value = rawValue.trim();
  if (!value) return null;

  if (isRegistrationId(value)) {
    return value;
  }

  try {
    const absolute = new URL(value);
    const id = absolute.searchParams.get("id");
    return id && isRegistrationId(id) ? id : null;
  } catch {
    try {
      const relative = new URL(value, "https://flisol.local");
      const id = relative.searchParams.get("id");
      return id && isRegistrationId(id) ? id : null;
    } catch {
      return null;
    }
  }
}
