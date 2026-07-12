import { useState } from "react";

export function ContactForm({ lang }) {
    const t = {
        es: {
            name: "Tu nombre",
            email: "Tu correo",
            message: "Escribe tu mensaje...",
            submit: "Enviar mensaje",
            statusOk: "Mensaje enviado correctamente",
            statusSending: "Enviando...",
            statusError: "Hubo un error al enviar el mensaje"
        },
        en: {
            name: "Your name",
            email: "Your email",
            message: "Write your message...",
            submit: "Send message",
            statusOk: "Your message has been sent successfully",
            statusSending: "Sending...",
            statusError: "Something went wrong while sending your message",
        },
    };


    const [status, setStatus] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()

        setStatus(t[lang].statusSending)

        const form = e.target
        const formData = new FormData(form)

        const response = await fetch("https://formspree.io/f/mykqjayg", {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json",
            },
        })

        if (response.ok) {
            form.reset()
            setStatus(t[lang].statusOk)
        } else {
            setStatus(t[lang].statusError)
        }

    }

    return (
        <div className="w-full">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full gap-4"
            >
                <input
                    type="hidden"
                    name="_subject"
                    value="Mensaje desde mi portafolio"
                />

                <div className="flex flex-col gap-1">
                    <input
                        type="text"
                        name="nombre"
                        placeholder={t[lang].name}
                        required
                        className="rounded-lg p-3 bg-transparent border border-gray-600
                        focus:border-white focus:outline-none transition duration-300"
                    />
                </div>

                <input
                    type="email"
                    name="_replyto"
                    placeholder={t[lang].email}
                    required
                    className="rounded-lg p-3 bg-transparent border border-gray-600
                    focus:border-white focus:outline-none transition duration-300"
                />

                <textarea
                    name="mensaje"
                    rows="4"
                    placeholder={t[lang].message}
                    required
                    className="rounded-lg p-3 bg-transparent border border-gray-600 
                    focus:border-white focus:outline-none transition duration-300 resize-none"
                ></textarea>

                <button
                    type="submit"
                    className="mt-2 rounded-lg p-3 bg-white text-black font-medium
                    hover:bg-gray-200 transition duration-300"
                >
                    {t[lang].submit}
                </button>

                {status && (
                    <p className="text-sm text-gray-400">{status}</p>
                )}
            </form>
        </div>
    )
}