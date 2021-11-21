import {
  Spinner,
  Breadcrumb,
  Button,
  Cage,
  Card,
  Flexbox,
  Heading,
  Icon,
  Image,
  Paragraph,
  Grid,
  Pagination,
} from "@synevix/react-widget";
import oielly from "@synevix/oielly-gateway";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import classnames from "classnames";

import { IStaff } from "../../interface";
import * as css from "../../utility/styling";
import imag from "../../assets/images/users/avatar-1.jpg";

const Staff_List = () => {
  const history = useHistory()

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
              icon={"icon-circle-left2"}
              className={css.iconStyling}
              onClick={() => history.goBack()}
            />
            <Heading
              type={"H3"}
              text={"Staff Lists"}
              className={css.pageTitle}
              style={{ fontSize: "2rem" }}
            />
          </Cage>
          <Link to={"/v1/entries/staff/add"} className={css.buttonLink}>
            <Icon name={"icon-user-plus"} />
          </Link>
        </Flexbox>

        <Breadcrumb
          items={[
            { text: "Dashboard", url: "/v1/dashboard" },
            { text: "Staff List", url: "" },
          ]}
        />
      </Card>
      <Content />
    </>
  );
}
const Content = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [state, setState] = useState<IStaff[]>([] as IStaff[]);

  useEffect(() => {
    oielly.staff.list({
      response: (success: any, error: any) => {
        if (error) { console.log(error); return; }
        setState(success);
        setLoading(false);
      },
    });
  }, []);

  return (
    <Cage className={css.contentStyling}>
      <Grid lg={"4"} gap={"3"} className={'mb-4'}>
        {state && state.map((item, index: number) => (
          <Card key={index} className={css.cardStyling}>
            <Link to={`/v1/entries/staff/${item.referenceId}/profile`}>
              <Image
                source={imag}
                alt={""}
                className={classnames(["m-auto", "w-1/2"])}
                style={{ borderRadius: "50%" }}
              />
              <Heading
                type={"H5"}
                text={`${item.surname} ${item.otherName}`}
                className={"mt-5 text-center font-bold"}
              />
              <Paragraph text={item.role} className={"text-center capitalize"} />
              <Paragraph text={item.contact} className={"text-center"} />
            </Link>
          </Card>
        ))}
      </Grid>

      {loading && <Spinner type={"circle"} />}
      <Pagination length={50} url={"/v1/entries/staff"} align={"center"} />
    </Cage>
  );
};
export default Staff_List;
