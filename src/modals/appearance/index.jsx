import { Link } from "react-router-dom"
import Button from "../../components/button"
import { useAppearance } from "../../store/appearance/hooks"
import classNames from "classnames"
import { setBackgroundColor, setColor, setFontSize } from "../../store/appearance"
import store from "../../store"
import { colors, fontSizes } from "../../utils/consts"
import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react"

export default function AppearanceModal({close}) {
    const modalRef = useRef(null);
    const { backgroundColor,  fontSize } = useAppearance()
    const dispatch = useDispatch()
    const color = useSelector((state) => state.appearance.color);

    const handleOutsideClick = (e) => {
        console.log('iceri')
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            console.log('disari')
          close()
        }
      };
    
    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
        };
      });
      

    return (
        <div className="w-[600px]" ref={modalRef}>
            <h3 className="mt-8 mb-3 text-[23px] leading-7 font-extrabold text-center">
                Customize Your View
            </h3>
            <div className="p-8 pt-0 " >
                <p className="text-center text-[color:var(--color-base-secondary)] leading-5 text-[15px] mb-5">
                    These settings affect all the X accounts on this browser.
                </p>
                <div className="mx-8 mb-4 ">
                    <div className="border border-[color:var(--background-third)] px-4 flex py-3 gap-3 rounded-2xl">
                        <img
                            src="https://pbs.twimg.com/profile_images/1683325380441128960/yRsRRjGO_x96.jpg"
                            alt=""
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1 flex flex-col">
                            <header className="mb-0.5 leading-5 text-[15px] flex items-center">
                                <div className="font-bold flex items-center">
                                    X
                                    <svg viewBox="0 0 22 22" height={18.75} className="text-[#1d9bf0] ml-0.5 ">
                                        <path 
                                            fill="currentColor"
                                            d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-1 flex items-center text-[color:var(--color-base-secondary)]">
                                    @X · 2h
                                </div>
                            </header>
                            <div className="text-[color:var(--color-base)] leading-5 text-[15px] ">
                                At the heart of X are short messages called posts — just like this one — which can include photos, videos, links, text, hashtags and  mentions like <Link to="/x" className="text-[#1d9bf0] hover hover:underline">@X</Link>.
                            </div>
                        </div>
                    </div>
                </div>

                    <div className="grid gap-3">
                    <section>
                        <h6 className="text-[color:var(--color-base-secondary)]  mb-1 leading-5 text-[13px] font-bold">Font size</h6>
                        <div className="bg-[color:var(--background-secondary)] p-4 rounded-2xl flex items-center gap-5">
                            <div className="text-[13px]">Aa</div>
                            <div className="h-1 bg-[color:var(--color-secondary)] flex-1 rounded-full flex justify-between">
                                {fontSizes.map((fs, index) => (
                                    <button 
                                        type="button"
                                        key={index}
                                        onClick={() => setFontSize(fs)}
                                        className="before:absolute before:inset-0 before:rounded-full before:hover:bg-[color:var(--color-primary)] before:opacity-20 w-8 h-8 rounded-full flex items-center justify-center relative -top-3.5 first:-ml-2 last:-mr-2">
                                        <div className={classNames("w-3 h-3 rounded-full bg-[color:var(--color-secondary)]", {
                                        "w-4 h-4": fs === fontSize,
                                        "!bg-[color:var(--color-primary)]": fs <= fontSize
                                        })} />
                                    </button>
                                ))}
                            </div>
                            <div className="text-[20px]">Aa</div>
                        </div>
                    </section>

                    <section>
                        <h6 className="text-[color:var(--color-base-secondary)]  mb-1 leading-5 text-[13px] font-bold">Color</h6>
                        <div className="bg-[color:var(--background-secondary)] py-2 mp-3 rounded-2xl flex justify-around items-center">
                        {colors.map((colors, index) => (
                            <button
                                key={index}
                                onClick={() => {dispatch(
                                    setColor({
                                        ...color,
                                        primary: colors
                                    }))

                                 }}
                                style={{'--bg': colors}}
                                className="w-10 h-10 rounded-full bg-[color:var(--bg)] flex items-center justify-center text-white">
                                    {color.primary === colors && (
                                        <svg viewBox="0 0 24 24" width={25}>
										    <path 
                                                fill="currentColor"
											    d="M9.64 18.952l-5.55-4.861 1.317-1.504 3.951 3.459 8.459-10.948L19.4 6.32 9.64 18.952z"/>
									    </svg>
                                    )}
                            </button>
                        ))}
                    </div>
                    </section>

                    <section>
                    <h6 className="text-[color:var(--color-base-secondary)]  mb-1 leading-5 text-[13px] font-bold">Background</h6>
                    <div className="py-2 px-4 mb-3 grid gap-2 grid-cols-3 bg-[color:var(--background-secondary)] rounded-2xl">
                        <button 
                            onClick={() => {store.dispatch(
                                setBackgroundColor({
                                    name: 'light',
                                    primary: '#ffffff',
                                    secondary: '#f7f9f9',
                                    third: '#eff3f4',
                                    modal: '#00000066'
                                })
                            )}}
                            className={classNames("h-16 pr-3 pl-2 bg-white text-[#0f1419] font-bold border border-white/10 rounded  group flex items-center gap-1.5", {
                                "!border-[color:var(--color-primary)] !border-2": backgroundColor.name === "light"
                            })}
                        >
                            <div className="w-10 h-10 rounded-full flex-shrink-0 group-hover:bg-black/5 flex items-center justify-center">
                                <div className={classNames("w-5 h-5 rounded-full border-2 border-[#b9cad3] flex items-center justify-center",{
                                    "!border-[color:var(--color-primary)] !bg-[color:var(--color-primary)] text-white": backgroundColor.name === "light"
                                })}>
                                    {backgroundColor.name === "light" && (<svg viewBox="0 0 24 24">
										<path
											fill="currentColor"
											d="M9.64 18.952l-5.55-4.861 1.317-1.504 3.951 3.459 8.459-10.948L19.4 6.32 9.64 18.952z"
										/>
									</svg>
                                    )}
                                </div>
                            </div>
                            Default
                        </button>
                        <button
                            onClick={() => {store.dispatch(
                                setBackgroundColor({
                                    name: 'dim',
                                    primary: '#15202b',
                                    secondary: '#1e2732',
                                    third: '#263340',
                                    modal: '#5b708366'
                                }),
                             )}}
                            className={classNames("h-16 pr-3 pl-2 bg-[#15202b] text-[#f7f9f9] border font-bold border-white/10 rounded group flex items-center gap-1.5", {
                                "!border-[color:var(--color-primary)] !border-2": backgroundColor.name === "dim"
                            })}
                        >
                            <div className="w-10 h-10 rounded-full flex-shrink-0 group-hover:bg-white/5 flex items-center justify-center">
                                <div className={classNames("w-5 h-5 rounded-full border-2 border-[#5c6e7e] flex items-center justify-center",{
                                    "!border-[color:var(--color-primary)] !bg-[color:var(--color-primary)] text-white": backgroundColor.name === "dim"
                                })}>
                                    {backgroundColor.name === "dim" && (<svg viewBox="0 0 24 24">
										<path
											fill="currentColor"
											d="M9.64 18.952l-5.55-4.861 1.317-1.504 3.951 3.459 8.459-10.948L19.4 6.32 9.64 18.952z"
										/>
									</svg>
                                    )}
                                </div>
                            </div>
                            Dim
                        </button>
                        <button 
                        onClick={() => {store.dispatch(
                            setBackgroundColor({
                                name: 'dark',
                                primary: '#000000',
                                secondary: '#16181c',
                                third: '#212327',
                                modal: '#5b708366'
                            })
                         )}}
                            className={classNames("h-16 pr-3 pl-2 bg-black text-[#f7f9f9] border font-bold border-white/10 rounded group flex items-center gap-1.5", {
                                "!border-[color:var(--color-primary)] !border-2": backgroundColor.name === "dark"
                            })}
                        >
                            <div className="w-10 h-10 rounded-full flex-shrink-0 group-hover:bg-white/5 flex items-center justify-center">
                                <div className={classNames("w-5 h-5 rounded-full border-2 border-[#3e4144] flex items-center justify-center",{
                                    "!border-[color:var(--color-primary)] !bg-[color:var(--color-primary)] text-white": backgroundColor.name === "dark"
                                })}>
                                    {backgroundColor.name === "dark" && (<svg viewBox="0 0 24 24">
										<path
											fill="currentColor"
											d="M9.64 18.952l-5.55-4.861 1.317-1.504 3.951 3.459 8.459-10.948L19.4 6.32 9.64 18.952z"
										/>
									</svg>
                                    )}
                                </div>
                            </div>
                            Lights out
                        </button>
                    </div>
                    </section>
                    </div>

                    <div className="flex items-center justify-center pt-4">
					    <Button as="button" onClick={()=> close()} variant="primary">Finished</Button>
				    </div>

            </div>
        </div>
    )
}