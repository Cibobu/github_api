import { ParsedUrlQuery } from "querystring";
import { ReactNode } from "react";
import { LangId } from "../language";

export interface ModalProps {
	icon?: React.VFC<React.SVGProps<SVGSVGElement>>;
	imgIcon?: string;
	title?: ReactNode;
	desc?: ReactNode;
	customContent?: ReactNode;
	isWithoutTriggerBtn?: boolean;
	isFullSize?: boolean;
	okLabel?: ReactNode;
	disableOkLabel?: boolean;
	onOk?: () => void;
	cancelLabel?: ReactNode;
	onCancel?: () => void;
	closable?: boolean;
}
export interface GlobalStateType {
	lang: LangId;
	isModal?: ModalProps;
	innerHeight: number;
	currentSlug?: ParsedUrlQuery;
}

// DEFAULT VALUE GLOBAL STATE
export const globalState: GlobalStateType = {
	lang: LangId.EN,
	innerHeight: 0,
}