import {
  Icon,
  Spinner,
  Pagination,
  Breadcrumb,
  Button,
  Cage,
  Card,
  Grid,
  Flexbox,
  Heading,
  Table, 
  TableItem,
  TableRow,
  SearchField,
} from "@synevix/react-widget";
import { useEffect, useState } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import oielly from "@synevix/oielly-gateway";
import * as css from "../../utility/styling";

import { IGuest } from "../../interface";

const Guest_List = () => (
  <>
    <Card className={css.cardStyling} style={{ borderRadius: "unset" }}>
      <Flexbox
        alignItems={"center"}
        justifyContent={"between"}
        style={{ borderBottom: "1px solid #eee", marginBottom: "0.5rem" }}
      >
        <Cage>
          <Button icon={"icon-circle-left2"} className={css.iconStyling} />
          <Heading
            type={"H3"}
            text={"Guest Lists"}
            className={css.pageTitle}
            style={{ fontSize: "2rem" }}
          />
        </Cage>
      </Flexbox>

      <Breadcrumb
        items={[
          { text: "Dashboard", url: "/v1/dashboard" },
          { text: "Guest List", url: "" },
        ]}
      />
    </Card>
    <Content />
  </>
);

const Content = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [state, setState] = useState<IGuest[]>([]);
  const tableHeader = ["SN", "Guest ID", "Surname", "Other Name", "Email", "Contact", "Action"];

  useEffect(() => {
    oielly.guest.list({
      response: (success: any, error: any) => {
        if (error) { console.log(error); return }
        setState(success);
        setLoading(false);

      },
    });
  }, []);

  return (
    <Cage className={css.contentStyling}>
      <Card className={css.cardStyling}>
        <Flexbox className={"mb-8"}>
          <Grid lg={"5"} className={"m-auto"}>
             
            <SearchField
              placeholder={"Search"}
              style={{ marginBottom: "0" }}
              onValueChange={(e:any) => console.log(e)}
            />
          </Grid>
        </Flexbox>
        <Table header={tableHeader}>
          {/* <TableRow>
            <TableHeader>SN</TableHeader>
            {tableHeader.map((item: string) => (
              <TableHeader>{item}</TableHeader>
            ))}
            <TableHeader>Action</TableHeader>
          </TableRow> */}
          {state.map((item, index: number) => (
            <TableRow key={index}>
              <TableItem>{index + 1}</TableItem>
              <TableItem>{item.guestId}</TableItem>
              <TableItem>{item.surname} </TableItem>
              <TableItem>{item.otherName}</TableItem>
              <TableItem>{item.email}</TableItem>
              <TableItem>{item.contact}</TableItem>
              <TableItem>
                <Link
                  to={`/v1/entries/guest/${item.referenceId}/profile`}
                  className={classnames([css.actionButton, css.actionProfile])}
                >
                  <Icon name={"icon-profile"} className={"icon-profile"} />
                </Link>
              </TableItem>
            </TableRow>
          ))}
        </Table>
        {loading && <Spinner type={"circle"} />}
        <Cage className={"pt-5"}>
          <Pagination length={50} url={"/v1/entries/guest"} align={"center"} />
        </Cage>
      </Card>
    </Cage>
  );
};

export default Guest_List;
