let vh = window.innerHeight * 0.01;

window.addEventListener("resize", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});
document.documentElement.style.setProperty("--vh", `${vh}px`);
import { TimelineLite, Power2 } from "gsap";

const albums = document.querySelectorAll(".album");

function animateDisk(e, tl) {
  if (window.innerWidth < 600) return;
  const el = e.target;

  const disk = el.querySelector(".album-disk");
  const cover = el.querySelector(".album-cover");

  if (e.type == "mouseenter") {
    if (tl.reversed()) {
      return tl.play();
    }
    tl.to(disk, { left: "35%", duration: 0.6, ease: Power2.easeOut }).to(
      cover,
      {
        left: "-15%",
        duration: 0.6,
        ease: Power2.easeIn,
      },
      "-0.15"
    );
  } else {
    tl.reverse();
  }
}

Array.from(albums).forEach((album) => {
  const tl = new TimelineLite();
  album.addEventListener("mouseenter", (e) => animateDisk(e, tl));
  album.addEventListener("mouseleave", (e) => animateDisk(e, tl));
});
