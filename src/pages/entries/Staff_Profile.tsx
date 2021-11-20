import { useEffect, useRef, useState } from "react";
import {
  Tab,
  Cage,
  Card,
  Flexbox,
  Heading,
  Image,
  Paragraph,
  TextField,
  Option,
  Button,
  Icon,
  Breadcrumb,
  TabItem,
  Grid
} from "@docty68/widget";
import oielly from "@docty68/oielly-gateway";
import classnames from "classnames";
import { Link, useParams, useHistory } from 'react-router-dom';

import { IResponse, IStaff } from "../../interface";
import { STAFF_UPLOAD } from "../../utility/constant";
import ImageUpload from "../../components/ImageUpload";
import imag from "../../assets/images/users/avatar-1.jpg";
import * as css from "../../utility/styling";
import { Toast } from "../../components/Toast";


const Staff_Profile = () => {
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
            <Button onClick={() => history.goBack()} icon={"icon-circle-left2"} className={css.iconStyling} style={{ color: '#000' }} />
            <Heading
              type={"H3"}
              text={"Staff Profile"}
              className={css.pageTitle}
              style={{ fontSize: "2rem" }}
            />
          </Cage>
          <Link to={"/v1/entries/staff/list"} className={css.buttonLink}>
            <Icon name={"icon-list"} />
          </Link>
        </Flexbox>

        <Breadcrumb
          items={[
            { text: "Dashboard", url: "/v1/dashboard" },
            { text: "Staff", url: "/v1/entries/staff/list" },
            { text: "Profile", url: "" },
          ]}
        />
      </Card>
      <Content />
    </>
  );
}

const Content = () => {
  const [state, setState] = useState<IStaff>({} as IStaff);
  const params = useParams<{ referencing: string }>();

  useEffect(() => {
    oielly.staff.profile({
      referenceId: params.referencing,
      response: (success: any, error: any) => {
        if (error) { console.log(error); return; }
        setState(success);
      }
    })
  }, [params.referencing]);

  return (
    <Cage className={css.contentStyling}>
      <Card className={css.cardStyling}>
        <Grid lg={'3'} gap={'3'} className={'mb-12'}>
          <LeftPane {...state} />
          <MiddlePane {...state} />
          <RightPane {...state} />
        </Grid>
        <Information {...state} />
      </Card>
    </Cage>
  );
};

const LeftPane = (props: IStaff) => {
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
          text={`${props.surname} ${props.otherName}`}
          className={"mt-5 text-center text-base font-bold"}
        />
        <Paragraph text={props.role} className={"text-center capitalize"} />
        <Paragraph
          text={"#" + props.staffId}
          className={"text-center text-italic"}
        />
      </Cage>
    </Card>
  );
};

const MiddlePane = (props: IStaff) => {
  return (
    <Card className={css.cardStyling}>
      <Heading
        className={css.profileCardTitle}
        type={'H3'}
        text={'Personal'}
      />
      <Grid md={'2'} style={{ gridAutoRows: '40px' }}>
        <Paragraph
          text={'Full Name :'}
          className={'font-bold'}
        />
        <Paragraph
          text={`${props.surname} ${props.otherName}`}
        />
        <Paragraph
          text={'Role :'}
          className={'font-bold'}
        />
        <Paragraph text={props.role} className={'capitalize'} />
        <Paragraph
          text={'Staff Id:'}
          className={'font-bold'}
        />
        <Paragraph
          text={"#" + props.staffId}
        />
        <Paragraph
          text={'Email:'}
          className={'font-bold'}
        />
        <Paragraph
          text={props.email}
        />
        <Paragraph
          text={'Contact:'}
          className={'font-bold'}
        />
        <Paragraph
          text={props.contact}
        />
        <Paragraph
          text={'Gender:'}
          className={'font-bold'}
        />
        <Paragraph
          text={props.gender}
          className={'capitalize'}
        />
      </Grid>
    </Card>
  );
};

const RightPane = (props: IStaff) => {
  return (
    <Card className={css.cardStyling}>
      <Heading
        className={css.profileCardTitle}
        type={'H3'}
        text={'Account'}
      />
      <Grid md={'2'} style={{ gridAutoRows: '40px' }}>
        <Paragraph
          text={'Bank Name :'}
          className={'font-bold'}
        />
        <Paragraph
          text={props.bankName}
        />
        <Paragraph
          text={'Account Number :'}
          className={'font-bold'}
        />
        <Paragraph
          text={props.accountNumber}
        />
        <Paragraph
          text={'Branch:'}
          className={'font-bold'}
        />
        <Paragraph
          text={props.bankBranch}
        />

      </Grid>
    </Card>
  );
};
const Information = (props: IStaff) => {
  return (
    <Tab direction={"col"}>
      <TabItem text={"Personal"}>
        <Personal {...props} />
      </TabItem>
      <TabItem text={"Account"}>
        <Account {...props} />
      </TabItem>
      <TabItem text={"Upload"}>
        <UploadProfile referenceId={props.referenceId} />
      </TabItem>
    </Tab>
  )
}

const Personal = (props: IStaff) => {
  const [state, setState] = useState<IStaff>(props);
  const [loading, setLoading] = useState<boolean>(false);
  const toastRef = useRef<HTMLDivElement>(null);
  const [response, setResponse] = useState<IResponse>({} as IResponse);

  useEffect(() => {
    setState(props);
  }, [props]);

  const updatePersonal = () => {
    setLoading(true);
    oielly.staff.update({
      referenceId: state.referenceId,
      data: { ...state },
      response: (success: any, error: any) => {
        toastRef.current!.style.display = 'flex'
        setLoading(false);
        if (error) {
          setResponse({ text: error.toString(), color: 'red', icon: 'icon-notification2' })
          return
        }
        setResponse({ text: success.message.toString(), color: 'green', icon: 'icon-info3' });

      }
    })

  }
  return (
    <Card className={css.cardStyling}>
      <Grid gap={'4'} className={'w-1/2 mx-auto'}>
        <TextField
          value={state.surname}
          placeholder={"Enter Surname"}
          onValueChange={(e) => setState({ ...state, surname: e.target.value })}
        />
        <TextField
          value={state.otherName}
          placeholder={"Enter Other Name"}
          onValueChange={(e) => setState({ ...state, otherName: e.target.value })}
        />
        <TextField
          value={state.email}
          type={"email"}
          placeholder={"Enter Email"}
          onValueChange={(e) => setState({ ...state, email: e.target.value })}
        />
        <TextField
          value={state.contact}
          type={"tel"}
          placeholder={"Enter Contact"}
          onValueChange={(e) => setState({ ...state, contact: e.target.value })}
        />

        <Option
          value={state.gender}
          item={["Male", "Female"]}
          onValueChange={(e: any) =>
            setState({ ...state, gender: e.target.value })
          }
        />
        <Option
          value={state.role}
          item={["Developer", "Accountant", "Manager", "Sales"]}
          onValueChange={(e: any) =>
            setState({ ...state, role: e.target.value })
          }
        />

        <Button text={"UPDATE"} className={css.formButton} onClick={updatePersonal} isLoading={loading} />
        <Toast {...response} refer={toastRef} className={'hidden'} />
      </Grid>

    </Card>
  );
};

const Account = (props: IStaff) => {
  const [state, setState] = useState<IStaff>(props);
  const [loading, setLoading] = useState<boolean>(false);
  const toastRef = useRef<HTMLDivElement>(null);
  const [response, setResponse] = useState<IResponse>({} as IResponse);

  useEffect(() => {
    setState(props);
  }, [props]);

  const updateAccount = () => {
    setLoading(true);

    oielly.staff.update({
      referenceId: state.referenceId,
      data: { ...state },
      response: (success: any, error: any) => {
        toastRef.current!.style.display = 'flex'
        setLoading(false);
        if (error) {
          setResponse({ text: error.toString(), color: 'red', icon: 'icon-notification2' })
          return
        }
        setResponse({ text: success.message.toString(), color: 'green', icon: 'icon-info3' });

      }
    })
  }
  return (
    <Card className={css.cardStyling}>
      <Grid gap={'4'} className={'w-1/2 mx-auto'}>
        <TextField
          value={state.bankName}
          placeholder={"Enter Bank Name"}
          onValueChange={(e) => setState({ ...state, bankName: e.target.value })}
        />
        <TextField
          value={state.bankBranch}
          placeholder={"Enter Branch"}
          onValueChange={(e) => setState({ ...state, bankBranch: e.target.value })}
        />
        <TextField
          value={state.accountNumber}
          type={"email"}
          placeholder={"Enter Account Number"}
          onValueChange={(e) => setState({ ...state, accountNumber: e.target.value })}
        />

        <Button text={"UPDATE"} className={css.formButton} onClick={updateAccount} isLoading={loading}/>
        <Toast {...response} refer={toastRef} className={'hidden'}/>   
      </Grid>
    </Card>
  );
};

const UploadProfile = ({ referenceId }: { referenceId: string }) => {

  const uploadImage = async (e: any) => {
    const formData = new FormData();
    formData.append("personal", e[0]);
    formData.append("name", referenceId);
    const requestOptions = {
      method: "POST",
      body: formData,
    } as RequestInit;

    await fetch(STAFF_UPLOAD, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (!result.ok) {
          return Promise.reject(result);
        }
        console.log(result);
      })
      .catch((error) => console.log(error));
  };
  return (

    <ImageUpload onSubmit={uploadImage} />

  );
};
export default Staff_Profile;
