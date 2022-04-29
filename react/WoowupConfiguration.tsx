import React, { FC, useState } from "react";
import { useMutation, useQuery } from "react-apollo";
import { Layout, PageBlock, Input, Button, Dropdown, Spinner, Alert } from "vtex.styleguide";
import saveConfigGQL from "./graphql/saveConfig.gql";
import configGQL from "./graphql/config.gql";
import getSalesChannelsGQL from "./graphql/getSalesChannel.gql";
import { useIntl, FormattedMessage } from 'react-intl';

const downloadCategoriesOptions = [
  { value: 'active', label: 'Activo' },
  { value: 'inactive', label: 'Inactivo' },
];

const WoowUpConfiguration: FC = () => {
  const intl = useIntl();
  const [config, setConfig] = useState({
    url: "",
    orderStatus: "",
    branchName: "",
    seller: "",
    appKey: "",
    appToken: "",
    salesChannel: "",
    downloadCategories: "",
    woowupVtexKey: ""
  });
  const [channelOptions, setSalesChannels] = useState([]);
  const [success, showSuccess] = useState(false);
  const [error, showError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {loading} = useQuery(configGQL, { onCompleted: ({ config }) => {if(config) {setConfig(config)}} });
  const [saveConfig] = useMutation(saveConfigGQL);

  useQuery(getSalesChannelsGQL, { onCompleted: ({ getSalesChannels }) => {
    const channels = getSalesChannels.map((a: { Id: any, Name: any; }) => { return {value: a.Id, label: a.Name} });
    setSalesChannels(channels)
  }});

  function save() {
    if (!config.url || !config.branchName || !config.appKey || !config.appToken || !config.woowupVtexKey) {
      showError(true)
      setErrorMessage(intl.formatMessage({id: "admin-woowup.configuration.missingFieldsError"}))
      return;
    }
    const body = {
        'vt_store': config.url,
        'vt_name': config.branchName,
        'vt_appkey': config.appKey,
        'vt_apptoken': config.appToken,
        'vt_seller': config.seller,
        'vt_categories_enabled': config.downloadCategories,
        'vt_status': config.orderStatus,
        'vt_f_saleschannel': config.salesChannel,
        'vt_identifier': "email"
      }

    let request: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": config.woowupVtexKey },
      body: JSON.stringify(body),
    }

    fetch("https://admin.woowup.com/apiv3/vtex/integration", request)
    .then(r =>  r.json().then(data => ({status: r.status, body: data})))
    .then(response => {
      if (response.status === 200) {
        showSuccess(true)
        saveConfig({
          variables: {
            config
          },
        });
      } else if (response.status === 403) {
        showError(true)
        setErrorMessage(intl.formatMessage({id: "admin-woowup.configuration.invalidCredentials"}))
      } else {
        showError(true)
        setErrorMessage(response.body.message)
      }
    })
    .catch((_e) => {
      showError(true)
      setErrorMessage(intl.formatMessage({id: "admin-woowup.configuration.unexpectedError"}))
    })
  }

  return (
    <Layout>
      <PageBlock title={intl.formatMessage({id: "admin-woowup.configuration.title"})} variation="full">
        {success &&
          <div style={{marginBottom: "20px"}}>
            <Alert className="mb-20" type="success" onClose={() => showSuccess(false)}>
              <FormattedMessage id="admin-woowup.configuration.success"/>
            </Alert>
          </div>
        }
        {error && 
          <div style={{marginBottom: "20px"}}>
            <Alert type="error" onClose={() => showError(false)}>
              Error: {errorMessage}
            </Alert> 
          </div>
        }
        {loading ? 
          <div className="flex" style={{justifyContent: "center"}}>
            <Spinner />
          </div>
           :
          <div className="flex" style={{justifyContent: "space-around"}}>
            <div className="flex w-40" style={{flexDirection: "column", gap: "15px"}}>
              <Input
                autocomplete="off"
                label="URL*"
                value={config.url ? config.url : ''}
                onChange={(e: any) =>
                  setConfig({ ...config, ...{ url: e.target.value } })
                }
              />

              <Input
                label={intl.formatMessage({id: "admin-woowup.configuration.input.branchName"})}
                autocomplete="off"
                value={config.branchName ? config.branchName : ''}
                onChange={(e: any) =>
                  setConfig({ ...config, ...{ branchName: e.target.value } })
                }
                suffix=".vtexcommercestable.com.br"
              />
              <Input
                autocomplete="off"
                label="App key*"
                value={config.appKey}
                onChange={(e: any) =>
                  setConfig({ ...config, ...{ appKey: e.target.value } })
                }
              />
              <Input
                autocomplete="off"
                label="App Token*"
                value={config.appToken}
                onChange={(e: any) =>
                  setConfig({ ...config, ...{ appToken: e.target.value } })
                }
              />
              <Input
                autocomplete="off"
                label="WoowUp VTEX Token*"
                value={config.woowupVtexKey}
                onChange={(e: any) =>
                  setConfig({ ...config, ...{ woowupVtexKey: e.target.value } })
                }
              />
            </div>
            <div className="w-40" style={{ display: "flex", flexDirection: "column", gap: "15px"} }>
              <Input
                autocomplete="off"
                label={intl.formatMessage({id: "admin-woowup.configuration.input.orderStatus"})}
                value={config.orderStatus}
                onChange={(e: any) =>
                  setConfig({ ...config, ...{ orderStatus: e.target.value } })
                }
              />
              <Input
                autocomplete="off"
                label="Seller"
                value={config.seller}
                onChange={(e: any) =>
                  setConfig({ ...config, ...{ seller: e.target.value } })
                }
              />
              <Dropdown
                label={intl.formatMessage({id: "admin-woowup.configuration.input.categories"})}
                options={downloadCategoriesOptions}
                value={config.downloadCategories}
                onChange={(_: any, v: React.SetStateAction<string>) => 
                  setConfig({ ...config, ...{ downloadCategories: v.toString() } })}
              />
              <Dropdown
                key="salesChannel"
                label="Sales Channel"
                options={channelOptions}
                value={config.salesChannel}
                onChange={(_: any, v: React.SetStateAction<string>) => 
                  setConfig({ ...config, ...{ salesChannel: v.toString() } })}
              />
              <br />
              <br />
              <div style={{marginTop: "25px", textAlign: "right"}}>
                <Button
                  onClick={() => {
                    save()
                  }}
                >
                  <FormattedMessage id="admin-woowup.configuration.save" />
                </Button>
              </div>
            </div>
          </div>
        }
      </PageBlock>
    </Layout>
  );
};

export default WoowUpConfiguration;
