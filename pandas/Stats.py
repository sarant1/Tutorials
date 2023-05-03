import pandas as pd

ics_df = pd.read_csv('csv/icecreamsales.csv')

print("Printing ice cream sales:")
print(ics_df)

print("\nPrint count of ice cream sales: ")
print(ics_df.count())

print("\nPrint mean of ice cream sales: ")
print(ics_df['Sales'].mean())

print("\nPrint median of ice cream sales: ")
print(ics_df['Sales'].median())

print("\nPrint mode of ice cream sales: ")
print(ics_df['Sales'].mode())

print("\n min and max")
print(ics_df['Sales'].min())
print(ics_df['Sales'].max())

print("\nPrint standard deviation of ice cream sales: ")
print(ics_df['Sales'].std())


ser_dice = pd.Series([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 2, 2, 2, 3, 3, 
                      4, 4, 4, 4, 5, 6, 7, 9, 10, 11, 12, 12, 12])

print("\nPrint dice rolls")
print(ser_dice.value_counts())