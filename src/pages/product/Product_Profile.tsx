import { Children, useEffect, useState } from "react";
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

import { IProductMaterial } from "../../interface";

import imag from "../../assets/images/users/avatar-1.jpg";
import * as css from "../../utility/styling";

const Product_Profile = () => {
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
              text={"Product Profile"}
              className={css.pageTitle}
              style={{ fontSize: "2rem" }}
            />
          </Cage>
          <Link to={"/v1/product/material/list"} className={css.buttonLink}>
            <Icon name={"icon-list"} />
          </Link>
        </Flexbox>

        <Breadcrumb
          items={[
            { text: "Dashboard", url: "/v1/dashboard" },
            { text: "Product", url: "/v1/product/material/list" },
            { text: "Profile", url: "" },
          ]}
        />
      </Card>
      <Content />
    </>
  );
};

const Content = () => {
  const [state, setState] = useState<IProductMaterial>({} as IProductMaterial);
  const params = useParams<{ referencing: string }>();

  useEffect(() => {
    oielly.product.profile({
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
        <Gallery {...state} />
      </Card>
    </Cage>
  );
};

const LeftPane = (props: IProductMaterial) => {
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
          text={props.materialName}
          className={"mt-5 text-center text-base font-bold"}
        />
        <Paragraph
          text={"#" + props.productId}
          className={"text-center text-italic"}
        />
      </Cage>
    </Card>
  );
};

const MiddlePane = (props: IProductMaterial) => {
  return (
    <Card className={css.cardStyling}>
      <Heading className={css.profileCardTitle} type={"H3"} text={"Personal"} />
      <Grid md={"2"} style={{ gridAutoRows: "40px" }}>
        <Paragraph text={"Product Name :"} className={"font-bold"} />
        <Paragraph text={props.materialName} />
        <Paragraph text={"Product Id:"} className={"font-bold"} />
        <Paragraph text={"#" + props.productId} />
        <Paragraph text={"Price:"} className={"font-bold"} />
        <Paragraph text={'GHC ' + props.price} />
        <Paragraph text={"Owner"} className={"font-bold"} />
        <Paragraph text={props.Client && props.Client.surname + ' ' + props.Client.otherName} />
        <Paragraph text={"Contact"} className={"font-bold"} />
        <Paragraph text={props.Client && props.Client.contact} />
      </Grid>
    </Card>
  );
};

const RightPane = (props: IProductMaterial) => {
  return (
    <Card className={css.cardStyling}>
      <Heading className={css.profileCardTitle} type={"H3"} text={"Others"} />
      <Grid md={"2"} style={{ gridAutoRows: "40px" }}>
        <Paragraph text={"Category :"} className={"font-bold"} />
        <Paragraph text={props.category} className={'capitalize'} />
        <Paragraph text={"Tag :"} className={"font-bold"} />
        <Paragraph text={props.tag} className={'capitalize'} />
        <Paragraph text={"Reviews:"} className={"font-bold"} />
        <Paragraph text={'15'} />
        <Paragraph text={"Description:"} className={"font-bold"} />
        <Paragraph text={props.description} />
      </Grid>
    </Card>
  );
};

const Gallery = (props: IProductMaterial) => {
  return (
    <Grid md={'3'} gap={'3'} style={{ gridAutoRows: '80px' }}>
      {
        props.imageUrl && Children.toArray(props.imageUrl.map(item => (
          <Card className={css.cardStyling}>
            <Image source={item.url} alt={'Items'} />
          </Card>
        )))
      }
    </Grid>
  )
};

export default Product_Profile;
