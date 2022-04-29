
export const TODAY = new Date();

export const convertDateToString = (dateProgress: Date) => {
    if (dateProgress) {
      const dateStr = new Date(dateProgress).toISOString().replace(/GMT.*$/, "GMT+0000");
      const fullDate = dateStr.replace("T", " ").replace(".", " ").split(" ");
      const dStart = fullDate[0].split("-");
      const fullTime = fullDate[1];
      return `${dStart[1]}/${dStart[2]}/${dStart[0]}, ${fullTime}`;
    }
}


export const modifyProgressDate = (stringDate: string) => {
    if(stringDate) {
      if (stringDate.includes("-")) {
        const date = stringDate.split("-");
        return date[1] + "/" + date[2] + "/" + date[0];
      }
      const date = stringDate.split(',')[0].split("/");
      const dateMonth = String(Number(date[1]) + 1).length === 2 ? "/" + String(Number(date[1]) + 1) : "/0" + String(Number(date[1]) + 1)

      return date[0] + dateMonth + "/" + date[2];
    }
    return stringDate
}
