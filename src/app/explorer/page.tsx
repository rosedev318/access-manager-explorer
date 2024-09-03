import ROUTES from "@/config/routes";
import { redirect } from "next/navigation";

const Explorer = () => {
  redirect(ROUTES.EXPLORER.ROOT(11155111));
};

export default Explorer;
