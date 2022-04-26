import React, { FC, useState } from "react";
import { useMutation, useQuery } from "react-apollo";
import { Layout, PageBlock, Input, Button, Dropdown } from "vtex.styleguide";
import saveConfigGQL from "./graphql/saveConfig.gql";
import configGQL from "./graphql/config.gql";

const downloadCategoriesOptions = [
  { value: 'active', label: 'Activo' },
  { value: 'inactive', label: 'Inactivo' },
];

const WoowUpConfiguration: FC = () => {
  const [config, setConfig] = useState({
    url: "",
    orderStatus: "",
    branchName: "",
    seller: "",
    appKey: "",
    appToken: "",
    salesChannel: "",
    downloadCategories: "",
  });
  useQuery(configGQL, { onCompleted: ({ config }) => setConfig(config) });
  const [saveConfig] = useMutation(saveConfigGQL);

  return (
    <Layout>
      <PageBlock title="Configuración WoowUp" variation="full">
      <div className="flex" style={{justifyContent: "space-around"}}>
        <div className="w-40" style={{display: "flex", flexDirection: "column", gap: "15px"}}>
          <Input
            autocomplete="off"
            label="URL*"
            value={config.url}
            onChange={(e: any) =>
              setConfig({ ...config, ...{ url: e.target.value } })
            }
          />
          <Input
            autocomplete="off"
            label="Nombre de la tienda*"
            value={config.branchName}
            onChange={(e: any) =>
              setConfig({ ...config, ...{ branchName: e.target.value } })
            }
          />
          <Input
            autocomplete="off"
            label="App key"
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
        </div>
        <div className="w-40" style={{ display: "flex", flexDirection: "column", gap: "15px"} }>
          <Input
            autocomplete="off"
            label="Estados de venta para descargar"
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
            label="Descarga de categorías"
            options={downloadCategoriesOptions}
            value={config.downloadCategories}
            onChange={(_: any, v: React.SetStateAction<string>) => 
              setConfig({ ...config, ...{ downloadCategories: v.toString() } })}
          />
          <Input
            autocomplete="off"
            label="Sales Channel"
            value={config.salesChannel}
            onChange={(e: any) =>
              setConfig({ ...config, ...{ salesChannel: e.target.value } })
            }
          />
          <div style={{marginTop: "25px", textAlign: "right"}}>
            <Button
              onClick={() => {
                saveConfig({
                  variables: {
                    config
                  },
                });
              }}
            >
              Guardar
            </Button>
          </div>
        </div>
      </div>
      </PageBlock>
    </Layout>
  );
};

export default WoowUpConfiguration;
