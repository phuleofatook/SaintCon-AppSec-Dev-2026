export interface FlightHistory {
  id: string;
  passengerId: string;
  csv: string;
}

export interface FlightHistoryRepository {
  findByIdAndPassengerId(historyId: string, passengerId: string): Promise<FlightHistory | null>;
}

export interface SignedInPassenger {
  id: string;
}

export async function exportFlightHistory(
  currentUser: SignedInPassenger,
  historyId: string,
  repository: FlightHistoryRepository,
): Promise<string | null> {
  const history = await repository.findByIdAndPassengerId(historyId, currentUser.id);

  if (!history) {
    return null;
  }

  return history.csv;
}
