import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ImageGallery({ images }) {
    const [current, setCurrent] = useState(images[0])
    const [fade, setFade] = useState(false)

    const handleChange = (img) => {
        if (img === current) return

        setFade(true)
        setTimeout(() => {
            setCurrent(img)
            setFade(false)
        }, 100);
    }

    const sliderRef = useRef(null)

    const scroll = (direction) => {
        sliderRef.current?.scrollBy({
            left: direction === "left" ? -150 : 150,
            behavior: "smooth",
        })
    }

    return (
        <div className="flex flex-col gap-4">
            <img
                src={current}
                className={`w-full h-54 object-cover transition-opacity duration-300
                    ${fade ? "opacity-0" : "opacity-100"}`}
            />

            <div className="relative">
                {images.length > 6 && (
                    <button
                        onClick={() => scroll("left")}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-50 hover:opacity-100 transition transition-300 cursor-pointer"
                    >
                        <ChevronLeft />
                    </button>
                )}

                <div
                    ref={sliderRef}
                    className="flex gap-2 overflow-x-auto no-scrollbar py-2 px-0.5 "
                >
                    {images.map((img) => (
                        <img
                            key={img}
                            src={img}
                            onMouseEnter={() => handleChange(img)}
                            className={`w-16 h-16 object-cover rounded-md cursor-pointer opacity-70 hover:opacity-100 
                            transition duration-300 ease-in-out
                            ${current === img ? "ring-2 ring-white" : ""}`}
                        />
                    ))}
                </div>
                {images.length > 6 && (
                    <button
                        onClick={() => scroll("right")}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10  opacity-50 hover:opacity-100 transition transition-300 cursor-pointer"
                    >
                        <ChevronRight />
                    </button>
                )}

            </div>
        </div>
    )
}