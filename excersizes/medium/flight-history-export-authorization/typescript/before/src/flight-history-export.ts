export interface FlightHistory {
  id: string;
  passengerId: string;
  csv: string;
}

export interface FlightHistoryRepository {
  findById(historyId: string): Promise<FlightHistory | null>;
}

export interface SignedInPassenger {
  id: string;
}

export async function exportFlightHistory(
  currentUser: SignedInPassenger,
  historyId: string,
  repository: FlightHistoryRepository,
): Promise<string | null> {
  const history = await repository.findById(historyId);

  if (!history) {
    return null;
  }

  return history.csv;
}
