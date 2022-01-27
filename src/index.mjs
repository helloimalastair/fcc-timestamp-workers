import {Router} from "itty-router";
import html from "../public/index.html";
import css from "../public/style.css";

const router = Router();

router.get("/", () => new Response(html, {headers: {"Content-Type": "text/html"}}));
router.get("/style.css", () => new Response(css, {headers: {"Content-Type": "text/css"}}));
router.get("/api/:time", ({params}) => {
  let date;
  if(Number.isNaN(Number.parseInt(params.time))) date = new Date(params.time);
  else date = new Date(Number.parseInt(params.time));
  return new Response(JSON.stringify({unix: date.getTime(), utc: date.toUTCString()}), {headers:{"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}});
});
router.get("/api", () => {
  const date = new Date();
  return new Response(JSON.stringify({unix: date.getTime(), utc: date.toUTCString()}), {headers:{"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}});
})
router.all("/*", () => new Response("Boop!"));

export default {
  fetch: router.handle
};