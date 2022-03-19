import {
  Icon,
  Breadcrumb,
  Cage,
  Card,
  Grid,
  Flexbox,
  Heading,
  TableItem,
  TableRow,
  Table,
  Button,
  Spinner,
  Pagination,
  SearchField,
} from "@synevix/react-widget";
import { useEffect, useState } from "react";
import classnames from "classnames";
import oielly from "@synevix/oielly-gateway";
import { Link } from "react-router-dom";

import { IClient } from "../../interface";
import * as css from "../../utility/styling";

const Client_List = () => (
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
            text={"Client Lists"}
            className={css.pageTitle}
            style={{ fontSize: "2rem" }}
          />
        </Cage>
        <Link to={"/v1/entries/client/add"} className={css.buttonLink}>
          <Icon name={"icon-user-plus"} />
        </Link>
      </Flexbox>

      <Breadcrumb
        items={[
          { text: "Dashboard", url: "/v1/dashboard" },
          { text: "Client List", url: "" },
        ]}
      />
    </Card>
    <Content />
  </>
);

const Content = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const divider = 10;
  const [dataSize, setDataSize] = useState<{min: number, max: number}>({min: 1, max: divider});
  const [state, setState] = useState<IClient[]>([] as IClient[]); 
  const tableHeader = [
    "SN",
    "Client ID",
    "Surname",
    "Other Name",
    "Email",
    "Contact",
    "Action"
  ];

  useEffect(() => { 
    oielly.client.list({
      range: [dataSize.min, dataSize.max], 
      response: (success: any, error: any) => {
        if (error) { console.log(error); return; }
         
        setState(success);
        setLoading(false);
        
      },
    });
     
  }, [dataSize.max, dataSize.min]);

  const paginationAction = (value: number) => {
    setDataSize({...dataSize, min: value-divider+1, max: value })
    console.log(( value-10 + 1), '----', value)
  }
 
  return (
    <Cage className={css.contentStyling}>
      <Card className={css.cardStyling}>
        <Flexbox className={"mb-8"}>
          <Grid lg={"5"} className={"m-auto"}>
            <SearchField
              placeholder={"Search"}
              style={{ marginBottom: "0" }}

              onValueChange={(e: any) => console.log(e)}
            />
          </Grid>
        </Flexbox>
        
        <Table header={tableHeader}>
          
          {state && state.map((item, index: number) => (
            <TableRow key={index}>
              <TableItem>{index + 1}</TableItem>
              <TableItem>{item.clientId}</TableItem>
              <TableItem>{item.surname} </TableItem>
              <TableItem>{item.otherName}</TableItem>
              <TableItem>{item.email}</TableItem>
              <TableItem>{item.contact}</TableItem> 
              <TableItem>
                <Link
                  to={`/v1/entries/client/${item.referenceId}/profile`}
                  className={classnames([css.actionButton, css.actionProfile])}
                >
                  <Icon name={"icon-file"} className={"icon-profile"} />
                </Link>
              </TableItem>
            </TableRow> 
          ))}
        </Table>
        {loading && <Spinner type={"circle"} />}
        <Cage className={"pt-5"}>
          <Pagination length={state.length} url={"/v1/entries/client/list"} align={"center"} actionHandler={paginationAction} divider={divider} />
        </Cage>
      </Card>
       
    </Cage>
  );
};

export default Client_List;
