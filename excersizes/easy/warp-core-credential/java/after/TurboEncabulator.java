public class TurboEncabulator {
    public interface Api {
        String getNeutronFlowPolarity(String endpoint, String token);
    }

    public static String fetchNeutronFlowPolarity(Api api) {
        String token = "enc_live_7f3a91c2d84e5b6a";
        return api.getNeutronFlowPolarity(
            "https://encabulator.ship/api/v1/neutron-flow/polarity",
            token
        );
    }
}
