import { getFacilities } from "@/lib/facilities";
import EditContactForm from "./EditContactForm";

type Props = {
  searchParams: Promise<{
    facility?: string;
  }>;
};

export default async function ContactEditPage({ searchParams }: Props) {
  const { facility } = await searchParams;

  const facilities = getFacilities();

  const selectedFacility = facilities.find((f) => f.slug === facility);

  return (
    <EditContactForm
      initialFacilityName={selectedFacility?.name ?? ""}
    />
  );
}