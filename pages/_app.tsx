import type { AppProps } from "next/app";
import Head from "next/head";
import { ThirdwebProvider, useSDK, useSigner } from "@thirdweb-dev/react";
import { CHAIN } from "../const/chains";
import {
  LensProvider,
  RequiredSigner,
  appId,
  production,
} from "@lens-protocol/react-web";
import { JsonRpcProvider } from "@ethersproject/providers";
import "@mantine/core/styles.css";
import NetworkSwitchModal from "@/components/NetworkSwitchModal";
import { useTypedDataSignerWrapper } from "@/lib/typedDataSigner";
import { useRouter } from "next/router";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { MantineProvider } from "@mantine/core";
import { MantineAppShell } from "@/components/MantineAppShell/MantineAppShell";
import SignInWithLensButton from "@/components/SignInWithLensButton";

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: "c3f32b63-2efa-41fe-82eb-344a8c0de9df",
  }),
});

function LensThirdwebProvider({ children }: { children: React.ReactNode }) {
  const sdk = useSDK();
  const signer = useSigner();
  const router = useRouter();
  const signerWrapped = useTypedDataSignerWrapper(signer, sdk);

  if (!signer && router.pathname !== "/") {
    return (
      <>
        <NetworkSwitchModal />
      </>
    );
  }

  return (
    <LensProvider
      config={{
        environment: production,
        bindings: {
          getSigner: async () => signerWrapped as RequiredSigner,
          getProvider: async () =>
            new JsonRpcProvider("https://polygon.rpc.thirdweb.com"),
        },
      }}
    >
      {children}
    </LensProvider>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Waves</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <MantineProvider>
          <LivepeerConfig client={livepeerClient}>
            <ThirdwebProvider
              activeChain={CHAIN}
              authConfig={{
                domain: process.env.NEXT_PUBLIC_AUTH_DOMAIN || "evmkit.com",
                authUrl: "/api/auth",
              }}
              clientId={process.env.NEXT_PUBLIC_THIRDWEB_API_KEY || ""}
            >
              <LensThirdwebProvider>
                <MantineAppShell>
                  <Notifications />

                  <Component {...pageProps} />
                </MantineAppShell>
              </LensThirdwebProvider>
            </ThirdwebProvider>
          </LivepeerConfig>
        </MantineProvider>
      </main>
    </>
  );
}

export default MyApp;
