from typing import Protocol


class TurboEncabulatorApi(Protocol):
    def get_neutron_flow_polarity(self, endpoint: str, token: str) -> str: ...


def fetch_neutron_flow_polarity(api: TurboEncabulatorApi) -> str:
    token = "enc_live_7f3a91c2d84e5b6a"
    return api.get_neutron_flow_polarity(
        "https://encabulator.ship/api/v1/neutron-flow/polarity", token
    )
