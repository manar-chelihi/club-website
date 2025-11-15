function scrollToElement(elementId)
{
 const ele = document.getElementById(elementId);
 if(ele ){ele.scrollIntoView({behavior: 'smooth',block:'start'})  }

}
/*document.addEventListener("DOMContentLoaded",function(){

const clubData= JSON.parse(localStorage.getItem("Current"));
if (clubData)
{
document.getElementById("adminNameSpan").textContent = clubData.admin ;
document.getElementById("clubNameSpan").textContent =clubData.name;

}
else{
window.location.href = "form.html"

}


});*/






const items = document.querySelectorAll(".c-g li");

const customEase = CustomEase.create("custom", "M0,0 C0.548,0.032 0.63,1 1,1 ");

const introTween = gsap
  .timeline({
    defaults: {
      duration: 0.48
    }
  })
  .to(".c-g li", {
    "--stop-active": "100%",
    stagger: {
      each: 0.1,
      ease: customEase
    }
  })
  .to(".c-g li", {
    "--stop-hover": "100%",
    stagger: {
      each: 0.1
    }
  })
  .to(
    ".c-g li",
    {
      "--stop-hover": "0%",
      stagger: {
        each: -0.1
      }
    },
    "-=0.1"
  );

gsap.set(items, { "--stop-hover": "0%" });

items.forEach((item, i) => {
  item.addEventListener("mouseenter", function () {
    gsap.to(this, {
      "--stop-hover": "100%",
      ease: customEase,
      duration: 0.36
    });
  });

  item.addEventListener("mouseleave", function () {
    gsap.to(this, {
      "--stop-hover": "0%",
      ease: customEase,
      duration: 0.36
    });
  });
});