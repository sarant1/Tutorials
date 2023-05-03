import pandas as pd
import numpy as np

ser_7 = pd.Series(range(5), index=['a', 'b', 'c', 'd', 'e'])
arr_4 = np.random.randint(10, 15, size=(2, 3))

df_8 = pd.DataFrame(arr_4, columns=['a', 'b', 'c'])

print("df_8 before:")
print(df_8)

print("\nIterating through columns in series:")
for col in ser_7:
    print(col)

print("\nIterating through columns in dataframe:")
for label, ser in df_8.items():
    print(label)
    print(ser)


print("\nIterating through rows in dataframe:")
for index, row in df_8.iterrows():
    print(f"{index}\n{row}")

print("\nIterating through rows in dataframe with itertuples(): ")
for row in df_8.itertuples():
    print(row)


# Sorting

df_8 = pd.DataFrame({''})
