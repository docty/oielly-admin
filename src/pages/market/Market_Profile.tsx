import { useEffect, useState } from "react";
import {
  Cage,
  Card,
  Flexbox,
  Heading,
  Image,
  Paragraph,
  Button,
  Icon,
  Breadcrumb,
  Grid,
} from "@docty68/widget";
import oielly from "@docty68/oielly-gateway";
import classnames from "classnames";
import { Link, useParams, useHistory } from "react-router-dom";

import { IMarketMaterial } from "../../interface";

import imag from "../../assets/images/users/avatar-1.jpg";
import * as css from "../../utility/styling";

const Market_Profile = () => {
  const history = useHistory();
  return (
    <>
      <Card className={css.cardStyling} style={{ borderRadius: "unset" }}>
        <Flexbox
          alignItems={"center"}
          justifyContent={"between"}
          style={{ borderBottom: "1px solid #eee", marginBottom: "0.5rem" }}
        >
          <Cage>
            <Button
              onClick={() => history.goBack()}
              icon={"icon-circle-left2"}
              className={css.iconStyling}
              style={{ color: "#000" }}
            />
            <Heading
              type={"H3"}
              text={"Market Profile"}
              className={css.pageTitle}
              style={{ fontSize: "2rem" }}
            />
          </Cage>
          <Link to={"/v1/market/material/list"} className={css.buttonLink}>
            <Icon name={"icon-list"} />
          </Link>
        </Flexbox>

        <Breadcrumb
          items={[
            { text: "Dashboard", url: "/v1/dashboard" },
            { text: "Market", url: "/v1/market/material/list" },
            { text: "Profile", url: "" },
          ]}
        />
      </Card>
      <Content />
    </>
  );
};

const Content = () => {
  const [state, setState] = useState<IMarketMaterial>({} as IMarketMaterial);
  const params = useParams<{ referencing: string }>();

  useEffect(() => {
    oielly.market.profile({
      referenceId: params.referencing,
      response: (success: any, error: any) => {
        console.log(success, error);
        if (error) {
          console.log(error);
          return;
        }
        setState(success);
      },
    });
  }, [params.referencing]);

  return (
    <Cage className={css.contentStyling}>
      <Card className={css.cardStyling}>
        <Grid lg={"3"} gap={"3"} className={"mb-5"}>
          <LeftPane {...state} />
          <MiddlePane {...state} />
          <RightPane {...state} />
        </Grid>
        <Information {...state} />
      </Card>
    </Cage>
  );
};

const LeftPane = (props: IMarketMaterial) => {
  return (
    <Card className={css.cardStyling}>
      <Cage>
        <Image
          source={imag}
          alt={""}
          className={classnames(["m-auto", "w-1/2"])}
          style={{ borderRadius: "50%" }}
        />
        <Heading
          type={"H4"}
          text={props.marketName}
          className={"mt-5 text-center text-base font-bold"}
        />
       <Paragraph
          text={"#" + props.marketId}
          className={"text-center text-italic"}
        />
      </Cage>
    </Card>
  );
};

const MiddlePane = (props: IMarketMaterial) => {
  return (
    <Card className={css.cardStyling}>
      <Heading className={css.profileCardTitle} type={"H3"} text={"Personal"} />
      <Grid md={"2"} style={{ gridAutoRows: "40px" }}>
        <Paragraph text={"Market Name :"} className={"font-bold"} />
        <Paragraph text={props.marketName} />
        <Paragraph text={"Market Id:"} className={"font-bold"} />
        <Paragraph text={"#" + props.marketId} />
        <Paragraph text={"Owner:"} className={"font-bold"} />
        <Paragraph text={'Asiedu Henry'} />
        <Paragraph text={"Contact:"} className={"font-bold"} />
        <Paragraph text={"0247049416"} />
        <Paragraph text={"Employees No.:"} className={"font-bold"} />
        <Paragraph text= {props.numberOfEmployees} />
        <Paragraph text={"Location:"} className={"font-bold"} />
        <Paragraph text= {props.location} />
        <Paragraph text={"Total Product:"} className={"font-bold"} />
        <Paragraph text= {'75'} />
      </Grid>
    </Card>
  );
};

const RightPane = (props: IMarketMaterial) => {
  return (
    <Card className={css.cardStyling}>
      <Heading className={css.profileCardTitle} type={"H3"} text={"Account"} />
      <Grid md={"2"} style={{ gridAutoRows: "40px" }}>
        <Paragraph text={"Bank Name :"} className={"font-bold"} />
        <Paragraph text={"Access Bank"} />
        <Paragraph text={"Account Number :"} className={"font-bold"} />
        <Paragraph text={"0065321065498646"} />
        <Paragraph text={"Branch:"} className={"font-bold"} />
        <Paragraph text={"Adum"} />
        <Paragraph text={"Sales:"} className={"font-bold"} />
        <Paragraph text={"GHC 1,354,686.00"} />
        <Paragraph text={"Transfer:"} className={"font-bold"} />
        <Paragraph text={"GHC 500.00"} />
        <Paragraph text={"Balance:"} className={"font-bold"} />
        <Paragraph text={"GHC 754.00"} />
      </Grid>
    </Card>
  );
};
const Information = (props: IMarketMaterial) => {
  return <></>;
};

export default Market_Profile;
