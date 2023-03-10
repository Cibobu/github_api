import { KeyboardEvent, useEffect, useRef, useState } from "react";

export const limitAddressDisplay = (text: string, length: number) => {
	if (!text) { return '-'; }
	else if (text.length > length) {
		return `${text.substring(0, length)} ...`
	} else {
		return text
	}
	// return `${text.substring(0, length)} ... ${text.substring(text.length - length)}`;
}

export const smoothScroll = (elementId: string, headerHeight: number) => {
	const scrollElement = document.getElementById(elementId)?.offsetTop || 0;
	window.scrollTo({ top: scrollElement-headerHeight, behavior: 'smooth'});
}

export const redirectToNewPage = (url: string, isNewTab?: boolean) => {
	console.log('url ;', url);
	
	const link = document.createElement("a");
	link.href = url
	if(isNewTab) link.target = "_blank"
	link.click()
	link.remove()
}

export const useDetectClickOut = <T extends HTMLElement,U extends HTMLElement>(initState: boolean) => {
	const triggerRef = useRef<U>(null);
	const nodeRef = useRef<T>(null);
	
	const [show, setShow] = useState<boolean>(initState);
 	const handleClickOutside = (event: MouseEvent) => {

		const trigger = triggerRef.current?.contains(event.target as Node | null)
		const node = nodeRef.current?.contains(event.target as Node | null)

		if(trigger && !node) {
			if(show) setShow(false)
			else setShow(true)
		}
		else if(!trigger && node) setShow(false)
		else if(!trigger && !node) setShow(false)
		else setShow(false)
	};
	const firstInit = () => {
		document.addEventListener("click", (evt) => handleClickOutside(evt), true);
		return () => {
			document.removeEventListener("click", (evt) => handleClickOutside(evt), true);
		};
	}
 	useEffect(firstInit,[]);
 	return {
		triggerRef,
		nodeRef,
		show,
		setShow
	}
}

export const replaceAlphabetInDigits = (val: string) =>{
	return val.replace(/[^\d,]+/g, '');
}

export const numFormatter = (n: string | number | bigint, decimalSymbol?: string) => {
	if(Number(n) > 0) {
    const splitNumber = String(n).split(decimalSymbol || ".")
    if(splitNumber.length > 1) return splitNumber[0].replace(/(.)(?=(\d{3})+$)/g,'$1.') + `,${splitNumber[1]}`
    else return String(n).replace(/(.)(?=(\d{3})+$)/g,'$1.')
  }
  else {
    const splitNumber = String(Number(n) * -1).split(decimalSymbol || ".")
    if(splitNumber.length > 1) return "-" + splitNumber[0].replace(/(.)(?=(\d{3})+$)/g,'$1.') + `,${splitNumber[1]}`
    else return String(n).replace(/(.)(?=(\d{3})+$)/g,'$1.')
  }
}

export const onKeyPressHandler = (evt: KeyboardEvent<HTMLInputElement>) => {
	const allowedKeys = ["1","2","3","4","5","6","7","8","9","0","Delete","Backspace","ArrowLeft","ArrowUp","ArrowDown","ArrowRight"]
	const finder = allowedKeys.find(key => key === evt.key)
	
	if(!finder) evt.preventDefault()
}

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getImageSize = (url: string) => {
	return new Promise<HTMLImageElement>((resolve) => {
		const img = new Image();
		img.onload = function() {
			resolve(this as HTMLImageElement)
		}
		img.src = url;
	})
}

export const debounce = <T extends (...args: any) => any>(func: T, wait?: number) => {
  let timeout: NodeJS.Timeout | number | undefined;
  return (...args: any) => {
    const later = () => {
      timeout = undefined;
      
      func(...args);
    };
    clearTimeout(timeout as number | undefined);
    
    timeout = setTimeout(later, wait);
  };
};

// Hook func vers.
export const useDebounce = <T extends (...args: any) => any>(func: T, args: Array<any>, wait?: number, funcBeforeDebounce?: () => void) => {
	const debounceProcess = useRef(debounce(func, wait))

	const listener = () => {
		if (funcBeforeDebounce) funcBeforeDebounce()
		debounceProcess.current(...args)
	}

	useEffect(listener, [...args])
}

export const throttle = <T extends (...args: any) => any>(func: T, wait?: number) => {
	let shouldWait = false
	let waitingArgs: any

	const timeoutFunc = () => {
		if(waitingArgs === null) shouldWait = false
		else {
			func(...waitingArgs)
			waitingArgs = null
			setTimeout(timeoutFunc, wait)
		}
	}

	return (...args: any) => {
		if(shouldWait) return

		func(...args)
		shouldWait = true

		setTimeout(timeoutFunc, wait)
	}
}