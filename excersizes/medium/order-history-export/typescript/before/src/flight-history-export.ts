export interface FlightHistory {
  id: string;
  passengerId: string;
  csv: string;
}

export interface FlightHistoryRepository {
  findByPassengerId(passengerId: string): Promise<FlightHistory[]>;
}

export interface SignedInPassenger {
  id: string;
}

export async function exportFlightHistory(
  currentUser: SignedInPassenger,
  repository: FlightHistoryRepository,
): Promise<string> {
  const histories = await repository.findByPassengerId(currentUser.id);
  return histories.map((history) => history.csv).join("\n");
}
