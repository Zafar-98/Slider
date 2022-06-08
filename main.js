class Slider {
    constructor(option) {
        this.slider = document.querySelector(option.el)
        this.sliderBox = this.slider.querySelector(".slider__box")
        this.slides = this.sliderBox.children
        //console.log(this.slides);
        this.prev = this.slider.querySelector(".slider__prev")
        this.next = this.slider.querySelector(".slider__next")
        
        this.dir = option.direction == undefined? "X" : option.direction
        this.direction = this.dir.toUpperCase() == "X" ? "X" : "Y"
        this.height = this.slider.clientHeight
        this.width = this.slider.clientWidth
        this.moveSize = "X" === this.dir ? this.width : this.height
        this.activeSlide = 0
        this.time = option.time == undefined ? 1000: option.time
        this.interval = isNaN(option.interval) == true ? this.time + 1000 : option.interval < this.time + 1000? console.error("Interval animationdan kichik bo'lishi mumkin emas ") : option.interval
        this.sliderBox.style = `position:relative;
                                height:${this.height}px;
                                overflow:hidden;`;
        for (let i = 0; i < this.slides.length; i++) {
            const slide = this.slides[i]
            slide.style = `position:absolute;
            width: ${this.width}px;
            height: ${this.height}px;`;
            if (i != this.activeSlide) {
                slide.style.transform = `translate${this.direction}(${this.moveSize}px)`

            }
            if (i === this.slides.length - 1) {
                slide.style.transform = `translate${this.direction}(${-this.moveSize}px)`
            }
        }
        if (option .autoplay == true){
            let interval = setInterval(() => {
               this.move(this.next) 
            }, this.interval);
            this.slider.addEventListener("mouseenter",()=>{
                clearInterval(interval)
            })
            this.slider.addEventListener("mouseleave", () =>{
                interval = setInterval(() => {
                   this.move(this.next) 
                }, this.interval);
            })
        }
        
        this.next.addEventListener("click", () => {this.move(this.next)})
        this.prev.addEventListener("click", () => {this.move(this.prev)})
    }
    
    move(btn) {
        this.next.disabled = true
        this.prev.disabled = true
        setTimeout(() => {
            this.next.disabled = false
            this.prev.disabled = false
        }, this.time);
        let nextOrPrev = btn == this.next ? this.moveSize * -1 : this.moveSize
        for (let i = 0; i < this.slides.length; i++) {
           const slide = this.slides[i]
           slide.style.transition = "0ms"
           if (i!= this.activeSlide){
               slide.style.transform = `translate${this.direction}(${nextOrPrev * -1}px)`
           }
            
        }
        this.slides[this.activeSlide].style.transform=`translate${this.direction}(${nextOrPrev}px)`
        this.slides[this.activeSlide].style.transition = this.time + "ms"
        if(btn ==this.next){
            this.activeSlide++
            if (this.activeSlide>= this.slides.length){
                this.activeSlide = 0
            }
        }else if (btn == this.prev){
            this.activeSlide--
            if (this.activeSlide < 0 ){
                this.activeSlide = this.slides.length - 1
            }
        }
        this.slides[this.activeSlide].style.transform =`translate${this.direction}(0)`
        this.slides[this.activeSlide].style.transition = this.time + "ms"
    }
}

const slider = new Slider({
    el: "#carousel",
    time : 1000
})
const slider2 = new Slider({
    el: "#carousel2",
    autoplay : true,
    interval :3000
})
const slider3 = new Slider({
    el: "#carousel3",
    direction : "Y"
})