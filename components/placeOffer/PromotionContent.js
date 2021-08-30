import React from "react"
import { Dialog } from "@material-ui/core";
import { useMedia } from "../../hooks/useMedia";

export default function PromotionContent({children, dialog = false, setDialog = false}) {
    const {matchesMobile, matchesTablet} = useMedia()
    return (
        matchesMobile || matchesTablet ? (
            <Dialog open={dialog || false} fullScreen={dialog} onClose={() => setDialog(!dialog)}>
                {children}
            </Dialog>
        ) : 
        (
            <>
                {children}
            </>
        )
    )
}