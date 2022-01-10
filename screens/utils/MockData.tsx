const generateMockData = (elementCount: number) => {
    const _calc:any = (data: any[], count: number) => {
        const newCount = count + 1
        const newData = data.concat({
            id: count,
            value: count,
        })

        if (count < elementCount) {
            return _calc(newData, newCount)
        } else {
            return newData
        }
    }

    return _calc([], 0)
}

export const mockData = generateMockData(40)