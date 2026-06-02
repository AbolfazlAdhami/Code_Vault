import { MatchData } from "./MatchData";
import { CsvFileReader } from "./CvsFileReader";

interface DataReader {
  read(): void;
  data: string[][];
}
