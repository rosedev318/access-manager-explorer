import ROUTES from "@/config/routes";
import { redirect } from "next/navigation";

const Home = () => {
  redirect(ROUTES.EXPLORER.ROOT(11155111));
};

export default Home;

