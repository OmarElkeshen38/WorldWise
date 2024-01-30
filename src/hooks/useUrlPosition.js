import { useSearchParams } from "react-router-dom";

function useUrlPostion() {
    const [searchParams] = useSearchParams();

    const lap = searchParams.get("lat");
    const lng = searchParams.get("lng");

    return [lat, lng]
}