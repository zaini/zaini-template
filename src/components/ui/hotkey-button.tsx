import { ArrowBigUp, Command } from "lucide-react"
import { ComponentProps } from "react"
import { LoadingButton } from "../ui/loading-button";
import { useHotkeys } from "react-hotkeys-hook";
import { Scopes } from "react-hotkeys-hook/dist/types";

type ButtonHotkeyProps = ComponentProps<typeof LoadingButton> & {
    children: React.ReactNode;
    hotkey: string;
    onClick?: () => void;
    scopes?: Scopes;
};

const HotkeyButton = (props: ButtonHotkeyProps) => {
    const { children, hotkey, onClick, scopes, ...otherProps } = props
    const isMac = window.navigator.platform.indexOf('Mac') > -1

    const hasMeta = hotkey.toLowerCase().includes('meta')
    const hasShift = hotkey.toLowerCase().includes('shift')

    const key = hotkey.replaceAll('Meta', '').replaceAll('Shift', '').replaceAll('+', '').replaceAll('meta', '').replaceAll('shift', '').trim()

    const plus = <span className="text-xs" key="plus">+</span>
    const meta = [isMac ? <Command className='size-4' /> : <span className='text-xs'>Ctrl</span>, plus]
    const shift = [<ArrowBigUp key="shift" className='size-4' />, plus]

    useHotkeys(hotkey, () => {
        onClick?.()
    }, { scopes })

    return (
        <LoadingButton onClick={onClick} {...otherProps}>
            {children}
            <div className='flex items-center justify-center ml-2 gap-1 opacity-80'>
                {
                    hasMeta && meta
                }
                {
                    hasShift && shift
                }
                <span className="text-xs">{key}</span>
            </div>
        </LoadingButton>
    )
}

export default HotkeyButton;