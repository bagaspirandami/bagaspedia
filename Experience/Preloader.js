import { EventEmitter } from "events";
import Experience from "./Experience.js";
import GSAP from "gsap";
import convert from "./Utils/covertDivsToSpans.js";

export default class Preloader extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        });

        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        });
    }

    setAssets() {
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".hero-main-title"));
        convert(document.querySelector(".hero-main-description"));
        convert(document.querySelector(".hero-second-subheading"));
        convert(document.querySelector(".second-sub"));

        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
        console.log(this.roomChildren);
    }

    firstIntro() {
        return new Promise((resolve) => {
            this.timeline = new GSAP.timeline();
            this.timeline.set(".animatedis", { y: 0, yPercent: 100 });
            this.timeline.to(".preloader", {
                opacity: 0,
                delay: 1,
                onComplete: () => {
                    document
                        .querySelector(".preloader")
                     
                },
            });
            if (this.device === "desktop") {
                this.timeline
                    
                    .to(this.room.position, {
                        x: -1,
                        ease: "power1.out",
                      
                    });
           } 

            this.timeline
                .to(".intro-text .animatedis", {
                    yPercent: 0,
                    stagger: 0.05,
                    ease: "back.out(1.7)",
                })
                .to(
                    ".arrow-svg-wrapper",
                    {
                        opacity: 1,
                    },
                    "same"
                )
                .to(
                    ".toggle-bar",
                    {
                        opacity: 1,
                        onComplete: resolve,
                    },
                    "same"
                );
        });
    }

    secondIntro() {
        return new Promise((resolve) => {
            this.secondTimeline = new GSAP.timeline();

            this.secondTimeline
                .to(
                    ".intro-text .animatedis",
                    {
                        yPercent: 100,
                        stagger: 0.05,
                        ease: "back.in(1.7)",
                    },
                    "fadeout"
                )
                .to(
                    ".arrow-svg-wrapper",
                    {
                        opacity: 0,
                    },
                    "fadeout"
                )
                .to(
                    this.room.position,
                    {
                        x: 0,
                        y: 0,
                        z: 0,
                        ease: "power1.out",
                    },
                    "same"
                )
               
                .to(
                    this.camera.orthographicCamera.position,
                    {
                        y: 6.5,
                    },
                    "same"
                )
               
                // ruangan dari rumah
                .set(this.roomChildren.body.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                })
                
                .to(
                    ".hero-main-title .animatedis",
                    {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                    },
                    "introtext"
                )
                .to(
                    ".hero-main-description .animatedis",
                    {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                    },
                    "introtext"
                )
                .to(
                    ".first-sub .animatedis",
                    {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                    },
                    "introtext"
                )
                .to(
                    ".second-sub .animatedis",
                    {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                    },
                    "introtext"
                )
    
                .to(
                    this.roomChildren.desk.scale,
                    {
                        x: 4.90899,
                        y: 5.52173,
                        z:5.42173,
                        ease: "back.out(2.2)",
                     
                    },
                                   )
                
                
                .to(this.roomChildren.meja.scale, {
                    x: 0.2,
                    y: 0.2,
                    z: 0.2,
                    ease: "back.out(2.2)",
                  
                },"meja"
            )
              
                .to(
                    this.roomChildren.kursi.scale,
                    {
                        x: 5.7,
                        y: 7.2,
                        z: 4.2,
                        ease: "back.out(2.2)",
                     
                    },
                    "kursi"
                )
              
                .to(
                    this.roomChildren.pc.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 0.5,
                   
                     
                    },
                  
                )
                .to(
                    this.roomChildren.computer.scale,
                    {
                        x: 6,
                        y: 6,
                        z: 4.5,
                   
                     
                    },
                    "computer"
                )
                .to(
                    this.roomChildren.keyboard.scale,
                    {
                        x: 0.3,
                        y: 0.4,
                        z: 0.1,
                   
                     
                    },
                  
                )
                .to(
                    this.roomChildren.sofa.scale,
                    {
                        x: 5,
                        y: 5,
                        z: 4,
                   
                     
                    },
                  
                )
               
                .to(
                    this.roomChildren.natal1.scale,
                    {
                        x: 0.5,
                        y: 0.6,
                        z: 0.4,
                   
                     
                    },
                  "Natal1"
                )
            
                .to(
                    this.roomChildren.computer1.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                   
                     
                    },
                  
                )
                
                .to(".arrow-svg-wrapper", {
                    opacity: 1,
                    onComplete: resolve,
                });
        });
    }

    onScroll(e) {
        if (e.deltaY > 0) {
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }

    onTouch(e) {
        this.initalY = e.touches[0].clientY;
    }

    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let difference = this.initalY - currentY;
        if (difference > 0) {
            console.log("swipped up");
            this.removeEventListeners();
            this.playSecondIntro();
        }
        this.intialY = null;
    }

    removeEventListeners() {
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    }

    async playIntro() {
        this.scaleFlag = true;
        await this.firstIntro();
        this.moveFlag = true;
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);
    }
    async playSecondIntro() {
        this.moveFlag = false;
        await this.secondIntro();
        this.scaleFlag = false;
        this.emit("enablecontrols");
    }

    move() {
        if (this.device === "desktop") {
            this.room.position.set(-1, 0, 0);
        } else {
            this.room.position.set(0, 0, -1);
        }
    }

    scale() {
        this.roomChildren.rectLight.width = 0;
        this.roomChildren.rectLight.height = 0;

        if (this.device === "desktop") {
            this.room.scale.set(0.11, 0.11, 0.11);
        } else {
            this.room.scale.set(0.07, 0.07, 0.07);
        }
    }

    update() {
        if (this.moveFlag) {
            this.move();
        }

        if (this.scaleFlag) {
            this.scale();
        }
    }
}
