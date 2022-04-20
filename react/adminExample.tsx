import React, { FC, useState } from "react";
import { Layout, PageBlock, Input, Dropdown } from "vtex.styleguide";

const options = [
  { value: 'active', label: 'Activo' },
  { value: 'inactive', label: 'Inactivo' },
];

const AdminExample: FC = () => {
  const [state, setState] = useState(options[0].value);

  return (
    <Layout>
      <PageBlock
        title="Configuración WoowUp"
        variation="full"
      >
        <Input autocomplete="off" label="URL*" />
        <Input autocomplete="off" label="Estados de venta para descargar" />
        <Input autocomplete="off" label="Nombre de la tienda*" />
        <Input autocomplete="off" label="Seller" />
        <Input autocomplete="off" label="App key" />
        <Dropdown
          label="Descarga de categorías"
          options={options}
          value={state}
          onChange={(_: any, v: React.SetStateAction<string>) => setState(v)}
        />
        <Input autocomplete="off" label="App Token*" />
        <Input autocomplete="off" label="Sales Channel" />
      </PageBlock>
    </Layout>
  );
};

export default AdminExample;
