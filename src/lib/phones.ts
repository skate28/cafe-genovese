import type { PhoneNumber, SiteContent } from "@/content/types";

/**
 * Number used by `sms:` links. Falls back to the cafe line while `textNumber` is unset.
 * Lives here (not in site.ts) so content can replace site.ts wholesale without carrying logic.
 */
export function textTarget(content: Pick<SiteContent, "textNumber" | "phone">): PhoneNumber {
  if (content.textNumber?.e164 || content.textNumber?.tel) return content.textNumber;
  return content.phone;
}

/** Call number. Open hours always use the cafe line; after close `afterHoursPhone` wins when set. */
export function callTarget(
  content: Pick<SiteContent, "phone" | "afterHoursPhone">,
  isClosed: boolean,
): PhoneNumber {
  if (isClosed && (content.afterHoursPhone?.e164 || content.afterHoursPhone?.tel)) {
    return content.afterHoursPhone;
  }
  return content.phone;
}
