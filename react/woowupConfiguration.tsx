import React, { FC, useState } from "react";
import { useMutation, useQuery } from 'react-apollo'
import { Layout, PageBlock, Input, Button } from "vtex.styleguide";
import saveConfigGQL from './graphql/saveConfig.gql'
import configGQL from './graphql/config.gql'

/*const downloadCategoriesOptions = [
  { value: 'active', label: 'Activo' },
  { value: 'inactive', label: 'Inactivo' },
];*/

const woowUpConfiguration: FC = () => {
  // const [downloadCategories, setDownloadCategories] = useState(downloadCategoriesOptions[0].value);
  const [config, setConfig] = useState({
    url: '',
    orderStatus: '',
    branchName: '',
    seller: '',
    appKey: '',
    appToken: '',
    salesChannel: '',
    downloadCategories: ''
  });
  useQuery(configGQL, { onCompleted: ({ config }) => setConfig(config) })
  const [saveConfig] = useMutation(saveConfigGQL)

  /*function click() {
    const body = { "name": "Yoda" }

    let request: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(body),
    }

    fetch("https://enaz0osynwltm.x.pipedream.net/", request);
  }*/

  return (
    <Layout>
      <PageBlock
        title="Configuración WoowUp"
        variation="full"
      >
        <Input
          autocomplete="off"
          label="URL*"
          value={config.url}
          onChange={(e: any) => setConfig({...config, ...{url:e.target.value}})}
        />
        <Input
          autocomplete="off"
          label="Estados de venta para descargar"
          value={config.orderStatus}
          onChange={(e: any) => setConfig({...config, ...{orderStatus:e.target.value}})}
        />
        <Input
          autocomplete="off"
          label="Nombre de la tienda*"
          value={config.branchName}
          onChange={(e: any) => setConfig({...config, ...{branchName:e.target.value}})}
        />
        <Input
          autocomplete="off"
          label="Seller"
          value={config.seller}
          onChange={(e: any) => setConfig({...config, ...{seller:e.target.value}})}
        />
        <Input
          autocomplete="off"
          label="App key"
          value={config.appKey}
          onChange={(e: any) => setConfig({...config, ...{appKey:e.target.value}})}
        />
        <Input
          autocomplete="off"
          label="Download categories"
          value={config.downloadCategories}
          onChange={(e: any) => setConfig({...config, ...{downloadCategories:e.target.value}})}
        />
        
        <Input
          autocomplete="off"
          label="App Token*"
          value={config.appToken}
          onChange={(e: any) => setConfig({...config, ...{appToken:e.target.value}})}
        />
        <Input
          autocomplete="off"
          label="Sales Channel"
          value={config.salesChannel}
          onChange={(e: any) => setConfig({...config, ...{salesChannel:e.target.value}})}
        />

        <Button
          onClick={() => {
            saveConfig({ variables: {config: { 
              url: config.url,
              orderStatus: config.orderStatus,
              branchName: config.branchName,
              seller: config.seller,
              appKey: config.appKey,
              downloadCategories: config.downloadCategories,
              appToken: config.appToken,
              salesChannel: config.salesChannel
            }} })
          }}
        >
          Guardar
        </Button>
      </PageBlock>
    </Layout>
  );
};

export default woowUpConfiguration;