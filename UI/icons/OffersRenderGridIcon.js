const OffersRenderGridIcon = ({clickHandler ,color}) => {
    return (
        <svg onClick={clickHandler} width="13" height="13" fill='none' xmlns="http://www.w3.org/2000/svg"><rect x=".5" y=".5" width="4.778" height="4.778" rx=".5" stroke={color}/><rect x=".5" y="7.722" width="4.778" height="4.778" rx=".5" stroke={color}/><rect x="7.722" y="7.722" width="4.778" height="4.778" rx=".5" stroke={color}/><rect x="7.722" y=".5" width="4.778" height="4.778" rx=".5" stroke={color}/></svg>
    )
}
export default OffersRenderGridIcon;