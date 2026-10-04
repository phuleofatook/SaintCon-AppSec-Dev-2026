export interface TurboEncabulatorApi {
  getNeutronFlowPolarity(endpoint: string, token: string): Promise<string>;
}

export async function fetchNeutronFlowPolarity(api: TurboEncabulatorApi): Promise<string> {
  const token = "enc_live_7f3a91c2d84e5b6a";
  return api.getNeutronFlowPolarity(
    "https://encabulator.ship/api/v1/neutron-flow/polarity",
    token,
  );
}
