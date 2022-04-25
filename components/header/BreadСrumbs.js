import Link from "next/link";
import { makeStyles } from "@material-ui/core";
import { useCity } from "../../lib/Context/CityCTX";
import { Box } from "@material-ui/core";
import CustomLinkUI from "src/UI/UIcomponent/CustomLinkUI/CustomLinkUI";
const useStyles = makeStyles((theme) => ({
  bread: {
    marginBottom: "32px",
    marginTop: "25px",
    [theme.breakpoints.down("1080")]: {
      marginBottom: "0px",
    },
  },
  breadActiveItem: {
    color: "#2C2C2C",
    height: "16px",
  },
}));

export default function BreadCrumbs({
  data,
  /**productOld = false,**/ searchData,
}) {
  const classes = useStyles();

  const { city } = useCity();

  return (
    <Box className={classes.bread}>
      <Box component="ul" className="clientPage__breadcrumbs thin">
        {data ? (
          <Box component="li">
            <CustomLinkUI
              href="/"
              defaultColor={false}
              customRoot={"breadCrumb light"}
            >
              {city}
            </CustomLinkUI>
          </Box>
        ) : null}
        {data
          ? data.map((item, index) => {
              const title =
                item.label[0].toUpperCase() + item.label.substring(1);
              return (
                <Box component="li" key={item.alias + index}>
                  <CustomLinkUI
                    href={`/search/${item.alias}`}
                    defaultColor={false}
                    customRoot={`breadCrumb light line 
									${index === data?.length - 1 && !searchData ? classes.breadActiveItem : ""}`}
                  >
                    {title}
                  </CustomLinkUI>
                </Box>
              );
            })
          : null}
        {searchData && (
          <CustomLinkUI
            defaultColor={false}
            customRoot={`breadCrumb light line ${classes.breadActiveItem}`}
          >
            {searchData}
          </CustomLinkUI>
        )}
        {/* {productOld ?
					<Link href="#">
						<a className={`breadCrumb light line ${classes.breadActiveItem}`}>{productOld}</a>
					</Link> : null} */}
      </Box>
    </Box>
  );
}
