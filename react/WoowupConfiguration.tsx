import type { FC } from "react";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-apollo";
import {
  Layout,
  PageBlock,
  Input,
  Button,
  Dropdown,
  Spinner,
  Alert,
  Link,
} from "vtex.styleguide";
import { useIntl, FormattedMessage } from "react-intl";

import saveConfigGQL from "./graphql/saveConfig.gql";
import configGQL from "./graphql/config.gql";
import getSalesChannelsGQL from "./graphql/getSalesChannel.gql";
import sendToWoowupGQL from "./graphql/sendToWoowup.gql";

const WoowUpConfiguration: FC = () => {
  const intl = useIntl();
  const [fields, setFields] = useState({
    url: "",
    orderStatus: "",
    seller: "",
    appKey: "",
    appToken: "",
    salesChannel: "",
    downloadCategories: "",
    woowupVtexKey: "",
  });

  const [channelOptions, setSalesChannels] = useState([]);
  const [success, showSuccess] = useState(false);
  const [error, showError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [missingVtexKey, showMissingVtexKey] = useState(false);

  const { loading } = useQuery(configGQL, {
    onCompleted: ({ config }) => {
      if (config) {
        if (!config.woowupVtexKey || config.woowupVtexKey === "") {
          showMissingVtexKey(true);
        }

        setFields(config);
      }
    },
  });

  const [saveConfig] = useMutation(saveConfigGQL);
  const [sendConfig] = useMutation(sendToWoowupGQL);
  const activeMessage = intl.formatMessage({
    id: "admin/admin-woowup.configuration.activeCategories",
  });

  const inactiveMessage = intl.formatMessage({
    id: "admin/admin-woowup.configuration.inactiveCategories",
  });

  const downloadCategoriesOptions = [
    { value: "1", label: activeMessage },
    { value: "0", label: inactiveMessage },
  ];

  useQuery(getSalesChannelsGQL, {
    onCompleted: ({ getSalesChannels }) => {
      const channels = getSalesChannels.map((a: { Id: any; Name: any }) => {
        return { value: a.Name, label: a.Name };
      });

      setSalesChannels(channels);
    },
  });

  function save() {
    if (!fields.url || !fields.appKey || !fields.appToken) {
      showError(true);
      setErrorMessage(
        intl.formatMessage({
          id: "admin/admin-woowup.configuration.missingFieldsError",
        })
      );

      return;
    }

    sendConfig({
      variables: {
        config: fields,
      },
    })
      .then((res) => {
        if (res.data.sendToWoowup === 200) {
          saveConfig({
            variables: {
              config: fields,
            },
          }).then((_r) => showSuccess(true));
        } else if (res.data.sendToWoowup === 403) {
          showError(true);
          setErrorMessage(
            intl.formatMessage({
              id: "admin/admin-woowup.configuration.invalidCredentials",
            })
          );
        } else {
          showError(true);
          setErrorMessage(
            intl.formatMessage({
              id: "admin/admin-woowup.configuration.unexpectedError",
            })
          );
        }
      })
      .catch((_e) => {
        showError(true);
        setErrorMessage(
          intl.formatMessage({
            id: "admin/admin-woowup.configuration.unexpectedError",
          })
        );
      });
  }

  return (
    <Layout>
      <PageBlock
        title={intl.formatMessage({
          id: "admin/admin-woowup.configuration.title",
        })}
        variation="full"
      >
        <p className="gray" style={{ marginLeft: "5%", marginBottom: "3%" }}>
          <FormattedMessage id="admin/admin-woowup.configuration.documentation" />{" "}
          <Link
            href="https://docs.woowup.com/vtex/vtex-app-configuracion"
            target="_blank"
            mediumWeigth
          >
            <FormattedMessage id="admin/admin-woowup.configuration.vtexLink" />
          </Link>
        </p>
        {success && (
          <div style={{ marginBottom: "20px" }}>
            <Alert
              className="mb-20"
              type="success"
              onClose={() => showSuccess(false)}
            >
              <FormattedMessage id="admin/admin-woowup.configuration.success" />
            </Alert>
          </div>
        )}
        {error && (
          <div style={{ marginBottom: "20px" }}>
            <Alert type="error" onClose={() => showError(false)}>
              Error: {errorMessage}
            </Alert>
          </div>
        )}
        {missingVtexKey && (
          <div style={{ marginBottom: "20px" }}>
            <Alert type="warning">
              <p>
                <FormattedMessage id="admin/admin-woowup.configuration.missingVtexKey" />{" "}
                <Link
                  href="../apps/woowup.woowup/setup"
                  target="_blank"
                  mediumWeigth
                >
                  <FormattedMessage id="admin/admin-woowup.configuration.labels.here" />
                </Link>
              </p>
            </Alert>
          </div>
        )}
        {loading ? (
          <div className="flex" style={{ justifyContent: "center" }}>
            <Spinner />
          </div>
        ) : (
          <div className="flex" style={{ justifyContent: "space-around" }}>
            <div
              className="flex w-40"
              style={{ flexDirection: "column", gap: "15px" }}
            >
              <Input
                autocomplete="off"
                label="URL*"
                value={fields.url ? fields.url : ""}
                onChange={(e: any) =>
                  setFields({ ...fields, ...{ url: e.target.value } })
                }
              />
              <Input
                autocomplete="off"
                label="App Key*"
                value={fields.appKey}
                onChange={(e: any) =>
                  setFields({ ...fields, ...{ appKey: e.target.value } })
                }
              />
              <Input
                autocomplete="off"
                label="App Token*"
                value={fields.appToken}
                onChange={(e: any) =>
                  setFields({ ...fields, ...{ appToken: e.target.value } })
                }
              />
              <Dropdown
                key="salesChannel"
                label="Sales Channel"
                options={channelOptions}
                value={fields.salesChannel}
                onChange={(_: any, v: React.SetStateAction<string>) =>
                  setFields({ ...fields, ...{ salesChannel: v.toString() } })
                }
              />
            </div>
            <div
              className="w-40"
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <Input
                autocomplete="off"
                label={intl.formatMessage({
                  id: "admin/admin-woowup.configuration.input.orderStatus",
                })}
                value={fields.orderStatus}
                onChange={(e: any) =>
                  setFields({ ...fields, ...{ orderStatus: e.target.value } })
                }
              />
              <Input
                autocomplete="off"
                label="Seller"
                value={fields.seller}
                onChange={(e: any) =>
                  setFields({ ...fields, ...{ seller: e.target.value } })
                }
              />
              <Dropdown
                label={intl.formatMessage({
                  id: "admin/admin-woowup.configuration.input.categories",
                })}
                options={downloadCategoriesOptions}
                value={fields.downloadCategories}
                onChange={(_: any, v: React.SetStateAction<string>) =>
                  setFields({
                    ...fields,
                    ...{ downloadCategories: v.toString() },
                  })
                }
              />
            </div>
          </div>
        )}
        <div style={{ textAlign: "right", marginRight: "5%" }}>
          <Button
            onClick={() => {
              save();
            }}
            disabled={!fields.woowupVtexKey || fields.woowupVtexKey === ""}
          >
            <FormattedMessage id="admin/admin-woowup.configuration.save" />
          </Button>
        </div>
      </PageBlock>
    </Layout>
  );
};

export default WoowUpConfiguration;
