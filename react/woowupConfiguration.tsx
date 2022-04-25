import React, { FC, useState } from "react";
import { useMutation } from 'react-apollo'
import { Layout, PageBlock, Input, Dropdown, Button } from "vtex.styleguide";
import saveConfigGQL from './graphql/saveConfig.gql'
// import configGQL from './graphql/config.gql'

const downloadCategoriesOptions = [
  { value: 'active', label: 'Activo' },
  { value: 'inactive', label: 'Inactivo' },
];

const woowUpConfiguration: FC = () => {
  const [downloadCategories, setDownloadCategories] = useState(downloadCategoriesOptions[0].value);
  const [config, setConfig] = useState('');
  const [saveConfig] = useMutation(saveConfigGQL)
  function click() {
    /*const body = { "name": "Yoda" }

    let request: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(body),
    }

    fetch("https://enaz0osynwltm.x.pipedream.net/", request);*/
  }

  return (
    <Layout>
      <PageBlock
        title="Configuración WoowUp"
        variation="full"
      >
        <Input
          placeholder="API Token"
          value={config}
          onChange={(e: any) => setConfig(e.target.value)}
        />
        <Button
          onClick={() => {
            saveConfig({ variables: { config } })
          }}
        >
          Guardar
        </Button>
        <Button onClick={click()} />
        <Input autocomplete="off" label="URL*" />
        <Input autocomplete="off" label="Estados de venta para descargar" />
        <Input autocomplete="off" label="Nombre de la tienda*" />
        <Input autocomplete="off" label="Seller" />
        <Input autocomplete="off" label="App key" />
        <Dropdown
          label="Descarga de categorías"
          options={downloadCategoriesOptions}
          value={downloadCategories}
          onChange={(_: any, v: React.SetStateAction<string>) => setDownloadCategories(v)}
        />
        <Input autocomplete="off" label="App Token*" />
        <Input autocomplete="off" label="Sales Channel" />
      </PageBlock>
    </Layout>
  );
};

export default woowUpConfiguration;