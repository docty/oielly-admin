import { useEffect, useState } from "react"; 
import {
  Image,
  Card,
  Flexbox,
  Cage,
  Button,
  Heading,
  Icon,
  Breadcrumb,
  Paragraph,
  Table, 
  TableItem,
  TableRow,
  Grid,
} from "@synevix/react-widget";
import { Link, useParams, useHistory } from "react-router-dom";
import oielly from "@synevix/oielly-gateway";
import classnames from "classnames";

import { IGuest } from "../../interface";
import * as css from "../../utility/styling";

const Guest_Profile = () => {
  const history = useHistory();
  return(
  <>
    <Card className={css.cardStyling} style={{ borderRadius: "unset" }}>
      <Flexbox
        alignItems={"center"}
        justifyContent={"between"}
        style={{ borderBottom: "1px solid #eee", marginBottom: "0.5rem" }}
      >
        <Cage>
          <Button onClick={() => history.goBack()} icon={"icon-circle-left2"} className={css.iconStyling} style={{color: '#000'}} />
          <Heading
            type={"H3"}
            text={"Guest Profile"}
            className={css.pageTitle}
            style={{ fontSize: "2rem" }}
          />
        </Cage>
        <Link to={"/v1/entries/guest/list"} className={css.buttonLink}>
          <Icon name={"icon-list"} />
        </Link>
      </Flexbox>

      <Breadcrumb
        items={[
          { text: "Dashboard", url: "/v1/dashboard" },
          { text: "Guest", url: "/v1/entries/guest/list" },
          { text: "Profile", url: "" },
        ]}
      />
    </Card>
    <Content />
  </>
);
      }
const Content = () => {
  const [state, setState] = useState<IGuest>({} as IGuest);
  const params = useParams<any>();

  useEffect(() => {
    oielly.guest.profile({
      referenceId: params.referencing,
      response: (success: any, error: any) => {
        if (error) {console.log(error); return;}
        console.log(success)
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
				<Order {...state} />
			</Card>
    </Cage>
  );
};

const LeftPane = (props: IGuest) => {
  return (
    <Card className={css.cardStyling}>
      
        <Image
          source={'https://res.cloudinary.com/dfsd5t9zt/image/upload/v1638576804/profile_images/noimage_dgiews.jpg'}
          alt={""}
          className={classnames(['w-1/2 m-auto'])}
          style={{ borderRadius: "50%" }}
        />
        
          <Heading
            type={"H4"}
            text={`${props.surname} ${props.otherName}`}
            className={"mt-5 text-center font-bold"}
          />
          <Paragraph
            text={"#" + props.guestId}
            className={"text-center text-italic"}
          />
       
      
    </Card>
  );
};

const MiddlePane = (props: IGuest) => {
	return (
		<Card className={css.cardStyling}>
			<Heading className={css.profileCardTitle} type={"H3"} text={"Personal"} />
			<Grid md={"2"} style={{ gridAutoRows: "40px" }}>
				<Paragraph text={"Full Name :"} className={"font-bold"} />
				<Paragraph text={`${props.surname} ${props.otherName}`} />
				<Paragraph text={"Guest Id:"} className={"font-bold"} />
				<Paragraph text={"#" + props.guestId} />
				<Paragraph text={"Email:"} className={"font-bold"} />
				<Paragraph text={props.email} />
				<Paragraph text={"Contact:"} className={"font-bold"} />
				<Paragraph text={props.contact} />
				
			</Grid>
		</Card>
	);
};
const RightPane = (props: IGuest) => {
	return (
		<Card className={css.cardStyling}>
			<Heading className={css.profileCardTitle} type={"H3"} text={"Address"} />
			<Grid md={"2"} style={{ gridAutoRows: "40px" }}>
				<Paragraph text={"House Number :"} className={"font-bold"} />
				<Paragraph text={"PLT 50 BLK D"} />
				<Paragraph text={"GPS  Address :"} className={"font-bold"} />
				<Paragraph text={"AW-434-5432"} />
				<Paragraph text={"City:"} className={"font-bold"} />
				<Paragraph text={"Accra"} />
			</Grid>
		</Card>
	);
};
const Order = (props: IGuest) => {
  const tableHeader = ["OrderID", "Amount", "Date"];
  return (
    <Table header={tableHeader}>
          {/* <TableRow>
            <TableHeader>SN</TableHeader>
            {tableHeader.map((item: string) => (
              <TableHeader>{item}</TableHeader>
            ))}
          </TableRow> */}
          {props.Orders && props.Orders.map((item, index: number) => (
            <TableRow key={index}>
              <TableItem>{index + 1}</TableItem>
              <TableItem>{item.orderId}</TableItem>
              <TableItem>{item.price.split('~~').reduce(((ini, val) => ini + parseFloat(val)), 0).toString()} </TableItem>
              <TableItem>{'09/19/2021'} </TableItem>
               
               
            </TableRow>
          ))}
        </Table>
  );
};

 
export default Guest_Profile;
