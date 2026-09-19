import { jsPDF } from "jspdf";
import type { GeneratedTrip } from "@/types/tripPlan";

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 48;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const DEEP_GREEN: [number, number, number] = [7, 61, 49];
const GOLD: [number, number, number] = [244, 169, 52];
const TEXT_DARK: [number, number, number] = [18, 52, 45];
const TEXT_MUTED: [number, number, number] = [104, 120, 115];

function drawHeader(doc: jsPDF) {
  doc.setFillColor(...DEEP_GREEN);
  doc.rect(0, 0, PAGE_WIDTH, 64, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("TripPlan AI", MARGIN, 38);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...GOLD);
  doc.text("Plan Smarter. Travel Better.", MARGIN, 52);
}

function drawFooter(doc: jsPDF, pageNumber: number) {
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(1.2);
  doc.line(MARGIN, PAGE_HEIGHT - 40, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 40);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...TEXT_MUTED);
  doc.text("Plan Smarter. Travel Better. — TripPlan AI", MARGIN, PAGE_HEIGHT - 26);
  doc.text(String(pageNumber), PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 26, { align: "right" });
}

interface Cursor {
  doc: jsPDF;
  y: number;
  page: number;
}

function newPage(cursor: Cursor) {
  drawFooter(cursor.doc, cursor.page);
  cursor.doc.addPage();
  cursor.page += 1;
  drawHeader(cursor.doc);
  cursor.y = 90;
}

function ensureSpace(cursor: Cursor, neededHeight: number) {
  if (cursor.y + neededHeight > PAGE_HEIGHT - 56) {
    newPage(cursor);
  }
}

function writeSectionTitle(cursor: Cursor, title: string) {
  ensureSpace(cursor, 30);
  cursor.doc.setFont("helvetica", "bold");
  cursor.doc.setFontSize(13);
  cursor.doc.setTextColor(...DEEP_GREEN);
  cursor.doc.text(title, MARGIN, cursor.y);
  cursor.y += 8;
  cursor.doc.setDrawColor(...GOLD);
  cursor.doc.setLineWidth(1);
  cursor.doc.line(MARGIN, cursor.y, PAGE_WIDTH - MARGIN, cursor.y);
  cursor.y += 16;
}

function writeParagraph(cursor: Cursor, text: string, options?: { bold?: boolean; size?: number; color?: [number, number, number] }) {
  const size = options?.size ?? 10;
  cursor.doc.setFont("helvetica", options?.bold ? "bold" : "normal");
  cursor.doc.setFontSize(size);
  cursor.doc.setTextColor(...(options?.color ?? TEXT_DARK));
  const lines = cursor.doc.splitTextToSize(text, CONTENT_WIDTH) as string[];
  ensureSpace(cursor, lines.length * (size * 1.35) + 4);
  cursor.doc.text(lines, MARGIN, cursor.y);
  cursor.y += lines.length * (size * 1.35) + 6;
}

function writeRow(cursor: Cursor, label: string, value: string) {
  ensureSpace(cursor, 16);
  cursor.doc.setFont("helvetica", "bold");
  cursor.doc.setFontSize(9.5);
  cursor.doc.setTextColor(...TEXT_MUTED);
  cursor.doc.text(label.toUpperCase(), MARGIN, cursor.y);
  cursor.doc.setFont("helvetica", "normal");
  cursor.doc.setFontSize(10.5);
  cursor.doc.setTextColor(...TEXT_DARK);
  cursor.doc.text(value, MARGIN + 130, cursor.y);
  cursor.y += 16;
}

export async function downloadTripPdf(trip: GeneratedTrip): Promise<void> {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const cursor: Cursor = { doc, y: 90, page: 1 };

  drawHeader(doc);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(...TEXT_DARK);
  doc.text(`Your ${trip.destination.name} Journey`, MARGIN, cursor.y);
  cursor.y += 26;

  writeRow(cursor, "Destination", trip.destination.name);
  writeRow(cursor, "Dates", `${trip.formState.startDate ?? "-"} to ${trip.formState.endDate ?? "-"}`);
  writeRow(cursor, "Duration", `${trip.days} Days / ${trip.nights} Nights`);
  writeRow(
    cursor,
    "Travelers",
    `${trip.formState.travelerType} · ${trip.formState.travelers.adults + trip.formState.travelers.children} people`,
  );
  writeRow(cursor, "Travel Style", trip.formState.travelStyles.join(", ") || "Not specified");
  writeRow(cursor, "Total Budget", `BDT ${Math.round(trip.budget.total).toLocaleString("en-US")}`);
  writeRow(cursor, "AI Match", `${trip.aiRecommendation.matchPercent}%`);

  cursor.y += 8;
  writeSectionTitle(cursor, "Day-by-Day Itinerary");
  trip.itinerary.forEach((day) => {
    ensureSpace(cursor, 20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    doc.setTextColor(...DEEP_GREEN);
    doc.text(`Day ${day.day}: ${day.title}`, MARGIN, cursor.y);
    cursor.y += 15;

    day.activities.forEach((activity) => {
      writeParagraph(
        cursor,
        `${activity.time} — ${activity.title} (${activity.location})${activity.cost > 0 ? ` · BDT ${activity.cost.toLocaleString("en-US")}` : ""}`,
        { bold: true, size: 9.5 },
      );
      writeParagraph(cursor, activity.description, { size: 9 });
    });
    cursor.y += 4;
  });

  writeSectionTitle(cursor, "Recommended Stays");
  trip.hotels.forEach((hotel) => {
    writeParagraph(
      cursor,
      `${hotel.name} — ${hotel.category}, ${hotel.location} · BDT ${hotel.pricePerNight.toLocaleString("en-US")}/night · Rating ${hotel.rating} · AI Match ${hotel.aiMatch}%`,
      { size: 9.5 },
    );
  });

  writeSectionTitle(cursor, "Food Recommendations");
  trip.food.forEach((item) => {
    writeParagraph(cursor, `${item.title} (${item.type}) — ${item.priceRange} · ${item.description}`, { size: 9.5 });
  });

  writeSectionTitle(cursor, "Transport Plan");
  trip.transport.legs.forEach((leg) => {
    writeParagraph(cursor, `${leg.from} → ${leg.to} (${leg.mode}) · BDT ${leg.estimatedCost.toLocaleString("en-US")}`, { size: 9.5 });
  });
  writeParagraph(cursor, `Total transport cost: BDT ${trip.transport.totalEstimatedCost.toLocaleString("en-US")}`, {
    bold: true,
    size: 9.5,
  });

  writeSectionTitle(cursor, "Budget Breakdown");
  trip.budget.categories.forEach((category) => {
    writeParagraph(cursor, `${category.label}: BDT ${category.amount.toLocaleString("en-US")} (${category.percent}%)`, {
      size: 9.5,
    });
  });
  writeParagraph(cursor, `Total: BDT ${Math.round(trip.budget.total).toLocaleString("en-US")}`, { bold: true, size: 10 });
  if (trip.budget.aiSuggestion) {
    writeParagraph(cursor, `AI Suggestion: ${trip.budget.aiSuggestion}`, { size: 9.5 });
  }

  writeSectionTitle(cursor, "AI Recommendation");
  writeParagraph(cursor, `Match Score: ${trip.aiRecommendation.matchPercent}%`, { bold: true, size: 10 });
  trip.aiRecommendation.reasons.forEach((reason) => {
    writeParagraph(cursor, `${reason.matched ? "✓" : "—"} ${reason.label}`, { size: 9.5 });
  });

  if (trip.notes.length > 0) {
    writeSectionTitle(cursor, "Important Notes");
    trip.notes.forEach((note) => writeParagraph(cursor, `• ${note}`, { size: 9.5 }));
  }

  drawFooter(doc, cursor.page);

  const fileName = `tripplan-ai-${trip.destination.slug}-${new Date(trip.createdAt).toISOString().slice(0, 10)}.pdf`;
  doc.save(fileName);
}
