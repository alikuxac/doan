/* eslint-disable react-hooks/rules-of-hooks */
import {
  PayPalScriptProvider,
  PayPalButtons,
  BraintreePayPalButtons,
  PayPalHostedField,
  PayPalHostedFieldsProvider,
  usePayPalHostedFields,
} from "@paypal/react-paypal-js";
import { FC } from "react";

const test: FC = () => {
  const hostedFields = usePayPalHostedFields();

  return (
    <>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AWJR3OCbwMt4oMb3mTkbzlNQAN9aF5OIAkvBIicj6kZ7YH604WmJhvozNGzIvi4btNYKaeFRi7bJi7rw",
          "merchant-id": "WT7GRHJFD4LHL",
          components: "marks,buttons",
          // "disable-funding": "",
          // "data-client-token": token,
          // components: "hosted-fields,buttons",
        }}
      >
          <PayPalButtons
            
            createOrder={(data, actions) => {

              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: "2",
                    },
                    description: "Hotel Resevation",
                  },
                ],
                application_context: {
                  shipping_preference: "NO_SHIPPING",
                },
              });
            }}
            onApprove={(data, action) => {
              return new Promise(async (resolve) => {
                const captured = await action.order?.capture();
                console.log(captured?.payer);
                resolve();
              });
            }}
            onError={(e) => {
              console.log(e.err);
            }}
          />
      </PayPalScriptProvider>
    </>
  );
};

export default test;
