import {Router} from "itty-router";
import html from "../public/index.html";
import css from "../public/style.css";

const router = Router();

router.get("/", () => new Response(html, {headers: {"Content-Type": "text/html"}}));
router.get("/style.css", () => new Response(css, {headers: {"Content-Type": "text/css"}}));
router.get("/api/:time", ({params}) => {
  let date = new Date(params.time);
  console.log(isNaN(date.getTime()))
  if(isNaN(date.getTime())) {
    date = new Date(0);
    date.setUTCSeconds(params.time/1000);
  }
  return new Response(JSON.stringify({unix: date.getTime(), utc: date.toUTCString()}), {headers:{"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}});
});
router.all("/*", () => Response.redirect("/"));

export default {
  fetch: router.handle
};