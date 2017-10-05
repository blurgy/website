 // --- Latin Vocabulary ---

var _ = (str) => str.replace(/_/g, String.fromCharCode(0x304));

// Word Object Constructor
class Word {
	constructor(params) {
		this.statement        = params.statement;
		this.definition       = params.definition;
		this.notes            = params.notes;
		this.type             = params.type;
		this.specialSyntax    = params.specialSyntax;
	}
	conjugation() {
		if (this.type.slice(0,4) === 'verb')
			return conjugate(this);
		else
			return null;
	}
	declension() {
		if (this.type.slice(0,4) === 'noun' ||
				this.type.slice(0,9) === 'adjective' ||
				this.type.slice(0,7) === 'pronoun')
			return decline(this);
		else
			return null;
	}
}
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXX conjugate and decline can be greatly reworked!!! XXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// Conjugate Word
var conjugate = word => {

	var conjugation;

	// conjugate word
	var st  = word.statement.split(', '),
			syn = word.specialSyntax;
	switch (word.type) {
		case 'verb 1T':
			var pr  = _(st[1].slice(0,-2)),
					pf  = _(st[2].slice(0,-2)),
					pfp = _(st[3]);
			// special
			conjugation = {
				indicative: {
					active: {
						present: {
							singular: {
								first:  word.statement === 'do_, dare, dedi_, datus' ? pr.slice(0,-1) + _('o_') : pr.slice(0,-2) + _('o_'),
								second: pr + 's',
								third:  word.statement === 'do_, dare, dedi_, datus' ? pr + 't' : pr.slice(0,-1) + 't'
							},
							plural: {
								first:  pr + 'mus',
								second: pr + 'tis',
								third:  word.statement === 'do_, dare, dedi_, datus' ? pr + 'nt' : pr.slice(0,-1) + 'nt'
							}
						},
						perfect: {
							singular: {
								first:  pf + _('i_'),
								second: pf + _('isti_'),
								third:  pf + 'it'
							},
							plural: {
								first:  pf + 'imus',
								second: pf + 'istis',
								third:  pf + _('e_runt') +
															' / ' + pf + _('e_re')
							}
						},
						imperfect: {
							singular: {
								first:  pr + 'bam',
								second: pr + _('ba_s'),
								third:  pr + 'bat'
							},
							plural: {
								first:  pr + _('ba_mus'),
								second: pr + _('ba_tis'),
								third:  pr + 'bant'
							}
						},
						pluperfect: {
							singular: {
								first:  pf + 'eram',
								second: pf + _('era_s'),
								third:  pf + 'eratt'
							},
							plural: {
								first:  pf + _('era_mus'),
								second: pf + _('era_tis'),
								third:  pf + 'erant'
							}
						},
						future: {
							singular: {
								first:  pr + _('bo_'),
								second: pr + 'bis',
								third:  pr + 'bit'
							},
							plural: {
								first:  pr + 'bimus',
								second: pr + 'bitis',
								third:  pr + 'bunt'
							}
						},
						futureperfect: {
							singular: {
								first:  pf + _('ero_'),
								second: pf + 'eris',
								third:  pf + 'erit'
							},
							plural: {
								first:  pf + 'erimus',
								second: pf + 'eritis',
								third:  pf + 'erint'
							}
						}
					},
					passive: {
						present: {
							singular: {
								first:  word.statement === 'do_, dare, dedi_, datus' ? pr .slice(0,-1) + 'or' : pr.slice(0,-2) + 'or',
								second: pr + 'ris' + ' / ' +
															pr + 're',
								third:  pr + 'tur'
							},
							plural: {
								first:  pr + 'mur',
								second: pr + _('mini_'),
								third:  word.statement === 'do_, dare, dedi_, datus' ? pr + 'ntur' : pr.slice(0,-1) + 'ntur'
							}
						},
						perfect: {
							singular: {
								first:  pfp + ', -a, -um sum',
								second: pfp + ', -a, -um es',
								third:  pfp + ', -a, -um est'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a sumus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a estis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a sunt')
							}
						},
						imperfect: {
							singular: {
								first:  pr + 'bar',
								second: pr + _('ba_ris') + ' / ' +
															pr + _('ba_re'),
								third:  pr + _('ba_tur')
							},
							plural: {
								first:  pr + _('ba_mur'),
								second: pr + _('ba_mini_'),
								third:  pr + 'bantur'
							}
						},
						pluperfect: {
							singular: {
								first:  pfp + ', -a, -um eram',
								second: pfp + _(', -a, -um era_s'),
								third:  pfp + ', -a, -um erat'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a era_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a era_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a erant'),
							}
						},
						future: {
							singular: {
								first:  pr + 'bor',
								second: pr + 'beris' + ' / ' +
															pr + 'bere',
								third:  pr + 'bitur'
							},
							plural: {
								first:  pr + 'bimur',
								second: pr + _('bimini_'),
								third:  pr + 'buntur'
							}
						},
						futureperfect: {
							singular: {
								first:  pfp + _(', -a, -um ero_'),
								second: pfp + ', -a, -um eris',
								third:  pfp + ', -a, -um erit'
							},
							plural: {
								first: 	pfp.slice(0,-2) + _('i_, -ae, -a erimus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a eritis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a erunt')
							}
						}
					}
				},
				imperative: {
					active: {
						present: {
							singular: {
								first: '-',
								second: pr,
								third: '-'
							},
							plural: {
								first: '-',
								second: pr + 'te',
								third: '-'
							}
						}
					},
					passive: {
						present: {
							singular: {
								first: '-',
								second: pr + 're',
								third: '-'
							},
							plural: {
								first: '-',
								second: pr + _('mini_'),
								third: '-'
							}
						}
					}
				},
				subjunctive: {
					active: {
						present: {
							singular: {
								first:  pr.slice(0,(word.statement === 'do_, dare, dedi_, datus' ? -1 : -2)) + 'em',
								second: pr.slice(0,(word.statement === 'do_, dare, dedi_, datus' ? -1 : -2)) + _('e_s'),
								third:  pr.slice(0,(word.statement === 'do_, dare, dedi_, datus' ? -1 : -2)) + 'et'
							},
							plural: {
								first:  pr.slice(0,(word.statement === 'do_, dare, dedi_, datus' ? -1 : -2)) + _('e_mus'),
								second: pr.slice(0,(word.statement === 'do_, dare, dedi_, datus' ? -1 : -2)) + _('e_tis'),
								third: 	pr.slice(0,(word.statement === 'do_, dare, dedi_, datus' ? -1 : -2)) + 'ent'
							}
						},
						imperfect: {
							singular: {
								first:  _(st[1]) + 'm',
								second: _(st[1]) + _('_s'),
								third: 	_(st[1]) + 't'
							},
							plural: {
								first: 	_(st[1]) + _('_mus'),
								second: _(st[1]) + _('_tis'),
								third: 	_(st[1]) + 'nt'
							}
						},
						perfect: {
							singular: {
								first:  pf + 'erim',
								second: pf + 'eris',
								third: 	pf + 'erit'
							},
							plural: {
								first: 	pf + 'erimus',
								second: pf + 'eritis',
								third:  pf + 'erint'
							}
						},
						pluperfect: {
							singular: {
								first:  pf + 'issem',
								second: pf + _('isse_s'),
								third:  pf + 'isset'
							},
							plural: {
								first:  pf + _('isse_mus'),
								second: pf + _('isse_tis'),
								third:  pf + 'issent'
							}
						}
					},
					passive: {
						present: {
							singular: {
								first:  pr.slice(0,-2) + 'er',
								second: pr.slice(0,-2) + _('e_ris') + ' / ' + pr.slice(0,-2) + _('e_re'),
								third:  pr.slice(0,-2) + _('e_tur')
							},
							plural: {
								first:  pr.slice(0,-2) + _('e_mur'),
								second: pr.slice(0,-2) + _('e_mini_'),
								third: 	pr.slice(0,-2) + 'entur'
							}
						},
						imperfect: {
							singular: {
								first:  _(st[1]) + 'r',
								second: _(st[1]) + _('_ris') + ' / ' + _(st[1]) + _('_re'),
								third:  _(st[1]) + _('_tur')
							},
							plural: {
								first:  _(st[1]) + _('_mur'),
								second: _(st[1]) + _('_mini_'),
								third:  _(st[1]) + 'ntur'
							}
						},
						perfect: {
							singular: {
								first:  pfp + ', -a, -um sim',
								second: pfp + _(', -a, -um si_s'),
								third: 	pfp + ', -a, -um sit'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a si_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a si_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a sint')
							}
						},
						pluperfect: {
							singular: {
								first:  pfp + ', -a, -um essem',
								second: pfp + _(', -a, -um esse_s'),
								third: 	pfp + ', -a, -um esset'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a esse_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a esse_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a essent')
							}
						}
					}
				},
				infinitive: {
					active: {
						present: pr + 're',
						perfect: '-',
						future:  '-'
					},
					passive: {
						present: pr +_('ri_'),
						perfect: '-',
						future:  '-'
					}
				},
				participle: {
					active: {
						present: pr + 'ns, ' + _(st[1].slice(0,-3)) + 'ntis',
						perfect: '-',
						future:   _(st[3].slice(0, (_(st[3].slice(0,-5)) === _('u_rus') ? -5 : -2))) + _('u_rus, -a, -um')
					},
					passive: {
						present: '-',
						perfect: _(st[3].slice(0,-5)) === _('u_rus') ? '-' : pfp + ', -a, -um',
						future:  _(st[1].slice(0,-3)) + 'ndus, -a, -um'
					}
				}
			}
		break;

		case 'verb 1TDep':
		case 'verb 1IDep':
			var pr   = _(st[1].slice(0,-3)),
					pfp  = _(st[2].slice(0,-4)),
					sbji = pr + 're';
			// special
			conjugation = {
				indicative: {
					passive: {
						present: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						perfect: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						imperfect: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						pluperfect: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						future: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						futureperfect: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						}
					},
					active: {
						present: {
							singular: {
								first:  pr.slice(0,-2) + 'or',
								second: pr + 'ris' + ' / ' +
															pr + 're',
								third:  pr + 'tur'
							},
							plural: {
								first:  pr + 'mur',
								second: pr + _('mini_'),
								third:  pr.slice(0,-1) + 'ntur'
							}
						},
						perfect: {
							singular: {
								first:  pfp + ', -a, -um sum',
								second: pfp + ', -a, -um es',
								third:  pfp + ', -a, -um est'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a sumus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a estis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a sunt')
							}
						},
						imperfect: {
							singular: {
								first:  pr + 'bar',
								second: pr + _('ba_ris') + ' / ' +
															pr + _('ba_re'),
								third:  pr + _('ba_tur')
							},
							plural: {
								first:  pr + _('ba_mur'),
								second: pr + _('ba_mini_'),
								third:  pr + 'bantur'
							}
						},
						pluperfect: {
							singular: {
								first:  pfp + ', -a, -um eram',
								second: pfp + _(', -a, -um era_s'),
								third:  pfp + ', -a, -um erat'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a era_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a era_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a erant'),
							}
						},
						future: {
							singular: {
								first:  pr + 'bor',
								second: pr + 'beris' + ' / ' +
															pr + 'bere',
								third:  pr + 'bitur'
							},
							plural: {
								first:  pr + 'bimur',
								second: pr + _('bimini_'),
								third:  pr + 'buntur'
							}
						},
						futureperfect: {
							singular: {
								first:  pfp + _(', -a, -um ero_'),
								second: pfp + ', -a, -um eris',
								third:  pfp + ', -a, -um erit'
							},
							plural: {
								first: 	pfp.slice(0,-2) + _('i_, -ae, -a erimus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a eritis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a erunt')
							}
						}
					}
				},
				imperative: {
					passive: {
						present: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first:  '-',
								second: '-',
								third:  '-'
							}
						}
					},
					active: {
						present: {
							singular: {
								first: '-',
								second: pr + 're',
								third: '-'
							},
							plural: {
								first: '-',
								second: pr + _('mini_'),
								third: '-'
							}
						}
					}
				},
				subjunctive: {
					passive: {
						present: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						},
						imperfect: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						},
						perfect: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						},
						pluperfect: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						}
					},
					active: {
						present: {
							singular: {
								first:  pr.slice(0,-2) + 'er',
								second: pr.slice(0,-2) + _('e_ris') + ' / ' + pr.slice(0,-2) + _('e_re'),
								third:  pr.slice(0,-2) + _('e_tur')
							},
							plural: {
								first:  pr.slice(0,-2) + _('e_mur'),
								second: pr.slice(0,-2) + _('e_mini_'),
								third: 	pr.slice(0,-2) + 'entur'
							}
						},
						imperfect: {
							singular: {
								first:  sbji + 'r',
								second: sbji + _('_ris') + ' / ' + sbji + _('_re'),
								third:  sbji + _('_tur')
							},
							plural: {
								first:  sbji + _('_mur'),
								second: sbji + _('_mini_'),
								third:  sbji + 'ntur'
							}
						},
						perfect: {
							singular: {
								first:  pfp + ', -a, -um sim',
								second: pfp + _(', -a, -um si_s'),
								third: 	pfp + ', -a, -um sit'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a si_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a si_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a sint')
							}
						},
						pluperfect: {
							singular: {
								first:  pfp + ', -a, -um essem',
								second: pfp + _(', -a, -um esse_s'),
								third: 	pfp + ', -a, -um esset'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a esse_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a esse_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a essent')
							}
						}
					}
				},
				infinitive: {
					passive: {
						present: '-',
						perfect: '-',
						future:  '-'
					},
					active: {
						present: pr + _('ri_'),
						perfect: '-',
						future:  '-'
					}
				},
				participle: {
					active: {
						present: pr + 'ns, ' + _(st[1].slice(0,-4)) + 'ntis',
						perfect: '-',
						future:  pfp.slice(0,-2) + _('u_rus, -a, -um')
					},
					passive: {
						present: '-',
						perfect: pfp + ', -a, -um',
						future:  _(st[1].slice(0,-4)) + 'ndus, -a, -um'
					}
				}
			}
		break;

		case 'verb 1I':
			var pr  = _(st[1].slice(0,-2)),
					pf  = _(st[2].slice(0,-2)),
					pfp = _(st[3]);
			conjugation = {
				indicative: {
					active: {
						present: {
							singular: {
								first:  pr.slice(0,-2) + _('o_'),
								second: pr + 's',
								third:  pr.slice(0,-1) + 't'
							},
							plural: {
								first:  pr + 'mus',
								second: pr + 'tis',
								third:  pr.slice(0,-1) + 'nt'
							}
						},
						perfect: {
							singular: {
								first:  pf + _('i_'),
								second: pf + _('isti_'),
								third:  pf + 'it'
							},
							plural: {
								first:  pf + 'imus',
								second: pf + 'istis',
								third:  pf + _('e_runt') +
															' / ' + pf + _('e_re')
							}
						},
						imperfect: {
							singular: {
								first:  pr + 'bam',
								second: pr + _('ba_s'),
								third:  pr + 'bat'
							},
							plural: {
								first:  pr + _('ba_mus'),
								second: pr + _('ba_tis'),
								third:  pr + 'bant'
							}
						},
						pluperfect: {
							singular: {
								first:  pf + 'eram',
								second: pf + _('era_s'),
								third:  pf + 'erat'
							},
							plural: {
								first:  pf + _('era_mus'),
								second: pf + _('era_tis'),
								third:  pf + 'erant'
							}
						},
						future: {
							singular: {
								first:  pr + _('bo_'),
								second: pr + 'bis',
								third:  pr + 'bit'
							},
							plural: {
								first:  pr + 'bimus',
								second: pr + 'bitis',
								third:  pr + 'bunt'
							}
						},
						futureperfect: {
							singular: {
								first:  pf + _('ero_'),
								second: pf + 'eris',
								third:  pf + 'erit'
							},
							plural: {
								first:  pf + 'erimus',
								second: pf + 'eritis',
								third:  pf + 'erint'
							}
						}
					},
					passive: {
						present: {
							singular: {
								first:  '-',
								second: '-',
								third:  '-',
							},
							plural: {
								first:  '-',
								second: '-',
								third:  '-',
							}
						},
						perfect: {
							singular: {
								first:  '-',
								second: '-',
								third:  '-',
							},
							plural: {
								first:  '-',
								second: '-',
								third:  '-',
							}
						},
						imperfect: {
							singular: {
								first:  '-',
								second: '-',
								third:  '-',
							},
							plural: {
								first:  '-',
								second: '-',
								third:  '-',
							}
						},
						pluperfect: {
							singular: {
								first:  '-',
								second: '-',
								third:  '-',
							},
							plural: {
								first:  '-',
								second: '-',
								third:  '-',
							}
						},
						future: {
							singular: {
								first:  '-',
								second: '-',
								third:  '-',
							},
							plural: {
								first:  '-',
								second: '-',
								third:  '-',
							}
						},
						futureperfect: {
							singular: {
								first:  '-',
								second: '-',
								third:  '-',
							},
							plural: {
								first: 	'-',
								second: '-',
								third:  '-',
							}
						}
					}
				},
				imperative: {
					active: {
						present: {
							singular: {
								first: '-',
								second: pr,
								third: '-'
							},
							plural: {
								first: '-',
								second: pr + 'te',
								third: '-'
							}
						}
					},
					passive: {
						present: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						}
					}
				},
				subjunctive: {
					active: {
						present: {
							singular: {
								first:  pr.slice(0,-2) + 'em',
								second: pr.slice(0,-2) + _('e_s'),
								third:  pr.slice(0,-2) + 'et'
							},
							plural: {
								first:  pr.slice(0,-2) + _('e_mus'),
								second: pr.slice(0,-2) + _('e_tis'),
								third: 	pr.slice(0,-2) + 'ent'
							}
						},
						imperfect: {
							singular: {
								first:  _(st[1]) + 'm',
								second: _(st[1]) + _('_s'),
								third: 	_(st[1]) + 't'
							},
							plural: {
								first: 	_(st[1]) + _('_mus'),
								second: _(st[1]) + _('_tis'),
								third: 	_(st[1]) + 'nt'
							}
						},
						perfect: {
							singular: {
								first:  pf + 'erim',
								second: pf + 'eris',
								third: 	pf + 'erit'
							},
							plural: {
								first: 	pf + 'erimus',
								second: pf + 'eritis',
								third:  pf + 'erint'
							}
						},
						pluperfect: {
							singular: {
								first:  pf + 'issem',
								second: pf + _('isse_s'),
								third:  pf + 'isset'
							},
							plural: {
								first:  pf + _('isse_mus'),
								second: pf + _('isse_tis'),
								third:  pf + 'issent'
							}
						}
					},
					passive: {
						present: {
							singular: {
								first:  '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first:  '-',
								second: '-',
								third: 	'-'
							}
						},
						imperfect: {
							singular: {
								first:  '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first:  '-',
								second: '-',
								third:  '-'
							}
						},
						perfect: {
							singular: {
								first:  '-',
								second: '-',
								third: 	'-'
							},
							plural: {
								first:  '-',
								second: '-',
								third:  '-'
							}
						},
						pluperfect: {
							singular: {
								first:  '-',
								second: '-',
								third: 	'-'
							},
							plural: {
								first:  '-',
								second: '-',
								third:  '-'
							}
						}
					}
				},
				infinitive: {
					active: {
						present: pr + 're',
						perfect: '-',
						future:  '-'
					},
					passive: {
						present: '-',
						perfect: '-',
						future:  '-'
					}
				},
				participle: {
					active: {
						present: pr + 'ns, ' + _(st[1].slice(0,-3)) + 'ntis',
						perfect: '-',
						future:  _(st[3].slice(0, (_(st[3].slice(0,-5)) === _('u_rus') ? -5 : -2))) + _('u_rus, -a, -um')
					},
					passive: {
						present: '-',
						perfect: _(st[3].slice(0,-5)) === _('u_rus') ? '-' : pfp + ', -a, -um',
						future:  _(st[1].slice(0,-3)) + 'ndus, -a, -um'
					}
				}
			}
		break;

		case 'verb 2':
			var pr  = _(st[1].slice(0,-2)),
					pf  = _(st[2].slice(0,-2)),
					pfp = _(st[3]);
			conjugation = {
				indicative: {
					active: {
						present: {
							singular: {
								first:  pr.slice(0,-1) + _('o_'),
								second: pr + 's',
								third:  pr.slice(0,-1) + 't'
							},
							plural: {
								first:  pr + 'mus',
								second: pr + 'tis',
								third:  pr.slice(0,-1) + 'nt'
							}
						},
						perfect: {
							singular: {
								first:  pf + _('i_'),
								second: pf + _('isti_'),
								third:  pf + 'it'
							},
							plural: {
								first:  pf + 'imus',
								second: pf + 'istis',
								third:  pf + _('e_runt') +
															' / ' + pf + _('e_re')
							}
						},
						imperfect: {
							singular: {
								first:  pr + 'bam',
								second: pr + _('ba_s'),
								third:  pr + 'bat'
							},
							plural: {
								first:  pr + _('ba_mus'),
								second: pr + _('ba_tis'),
								third:  pr + 'bant'
							}
						},
						pluperfect: {
							singular: {
								first:  pf + 'eram',
								second: pf + _('era_s'),
								third:  pf + 'erat'
							},
							plural: {
								first:  pf + _('era_mus'),
								second: pf + _('era_tis'),
								third:  pf + 'erant'
							}
						},
						future: {
							singular: {
								first:  pr + _('bo_'),
								second: pr + 'bis',
								third:  pr + 'bit'
							},
							plural: {
								first:  pr + 'bimus',
								second: pr + 'bitis',
								third:  pr + 'bunt'
							}
						},
						futureperfect: {
							singular: {
								first:  pf + _('ero_'),
								second: pf + 'eris',
								third:  pf + 'erit'
							},
							plural: {
								first:  pf + 'erimus',
								second: pf + 'eritis',
								third:  pf + 'erint'
							}
						}
					},
					passive: {
						present: {
							singular: {
								first:  pr.slice(0,-1) + 'or',
								second: pr + 'ris' + ' / ' +
															pr + 're',
								third:  pr + 'tur'
							},
							plural: {
								first:  pr + 'mur',
								second: pr + _('mini_'),
								third:  pr.slice(0,-1) + 'ntur'
							}
						},
						perfect: {
							singular: {
								first:  pfp + ', -a, -um sum',
								second: pfp + ', -a, -um es',
								third:  pfp + ', -a, -um est'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a sumus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a estis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a sunt')
							}
						},
						imperfect: {
							singular: {
								first:  pr + 'bar',
								second: pr + _('ba_ris') + ' / ' +
															pr + _('ba_re'),
								third:  pr + _('ba_tur')
							},
							plural: {
								first:  pr + _('ba_mur'),
								second: pr + _('ba_mini_'),
								third:  pr + 'bantur'
							}
						},
						pluperfect: {
							singular: {
								first:  pfp + ', -a, -um eram',
								second: pfp + _(', -a, -um era_s'),
								third:  pfp + ', -a, -um erat'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a era_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a era_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a erant'),
							}
						},
						future: {
							singular: {
								first:  pr + 'bor',
								second: pr + 'beris' + ' / ' +
															pr + 'bere',
								third:  pr + 'bitur'
							},
							plural: {
								first:  pr + 'bimur',
								second: pr + _('bimini_'),
								third:  pr + 'buntur'
							}
						},
						futureperfect: {
							singular: {
								first:  pfp + _(', -a, -um ero_'),
								second: pfp + ', -a, -um eris',
								third:  pfp + ', -a, -um erit'
							},
							plural: {
								first: 	pfp.slice(0,-2) + _('i_, -ae, -a erimus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a eritis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a erunt')
							}
						}
					}
				},
				imperative: {
					active: {
						present: {
							singular: {
								first: '-',
								second: pr,
								third: '-'
							},
							plural: {
								first: '-',
								second: pr + 'te',
								third: '-'
							}
						}
					},
					passive: {
						present: {
							singular: {
								first: '-',
								second: pr + 're',
								third: '-'
							},
							plural: {
								first: '-',
								second: pr + _('mini_'),
								third: '-'
							}
						}
					}
				},
				subjunctive: {
					active: {
						present: {
							singular: {
								first:  pr.slice(0,-2) + 'eam',
								second: pr.slice(0,-2) + _('ea_s'),
								third:  pr.slice(0,-2) + 'eat'
							},
							plural: {
								first:  pr.slice(0,-2) + _('ea_mus'),
								second: pr.slice(0,-2) + _('ea_tis'),
								third: 	pr.slice(0,-2) + 'eant'
							}
						},
						imperfect: {
							singular: {
								first:  _(st[1]) + 'm',
								second: _(st[1]) + _('_s'),
								third: 	_(st[1]) + 't'
							},
							plural: {
								first: 	_(st[1]) + _('_mus'),
								second: _(st[1]) + _('_tis'),
								third: 	_(st[1]) + 'nt'
							}
						},
						perfect: {
							singular: {
								first:  pf + 'erim',
								second: pf + 'eris',
								third: 	pf + 'erit'
							},
							plural: {
								first: 	pf + 'erimus',
								second: pf + 'eritis',
								third:  pf + 'erint'
							}
						},
						pluperfect: {
							singular: {
								first:  pf + 'issem',
								second: pf + _('isse_s'),
								third:  pf + 'isset'
							},
							plural: {
								first:  pf + _('isse_mus'),
								second: pf + _('isse_tis'),
								third:  pf + 'issent'
							}
						}
					},
					passive: {
						present: {
							singular: {
								first:  pr.slice(0,-2) + 'ear',
								second: pr.slice(0,-2) + _('ea_ris') + ' / ' + pr.slice(0,-2) + _('ea_re'),
								third:  pr.slice(0,-2) + _('ea_tur')
							},
							plural: {
								first:  pr.slice(0,-2) + _('ea_mur'),
								second: pr.slice(0,-2) + _('ea_mini_'),
								third: 	pr.slice(0,-2) + 'eantur'
							}
						},
						imperfect: {
							singular: {
								first:  _(st[1]) + 'r',
								second: _(st[1]) + _('_ris') + ' / ' + _(st[1]) + _('_re'),
								third:  _(st[1]) + _('_tur')
							},
							plural: {
								first:  _(st[1]) + _('_mur'),
								second: _(st[1]) + _('_mini_'),
								third:  _(st[1]) + 'ntur'
							}
						},
						perfect: {
							singular: {
								first:  pfp + ', -a, -um sim',
								second: pfp + _(', -a, -um si_s'),
								third: 	pfp + ', -a, -um sit'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a si_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a si_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a sint')
							}
						},
						pluperfect: {
							singular: {
								first:  pfp + ', -a, -um essem',
								second: pfp + _(', -a, -um esse_s'),
								third: 	pfp + ', -a, -um esset'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a esse_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a esse_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a essent')
							}
						}
					}
				},
				infinitive: {
					active:  {
						present: pr + 're',
						perfect: '-',
						future:  '-'
					},
					passive: {
						present: pr +_('ri_'),
						perfect: '-',
						future:  '-'
					}
				},
				participle: {
					active: {
						present: pr + 'ns, ' + _(st[1].slice(0,-3)) + 'ntis',
						perfect: '-',
						future:  _(st[3].slice(0, (_(st[3].slice(0,-5)) === _('u_rus') ? -5 : -2))) + _('u_rus, -a, -um')
					},
					passive: {
						present: '-',
						perfect: _(st[3].slice(0,-5)) === _('u_rus') ? '-' : pfp + ', -a, -um',
						future:  _(st[1].slice(0,-3)) + 'ndus, -a, -um'
					}
				}
			}
		break;

		case 'verb 2Dep':
			var pr   = _(st[1].slice(0,-3)),
					pfp  = _(st[2].slice(0,-4)),
					sbji = pr + 're';
			conjugation = {
				indicative: {
					passive: {
						present: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						perfect: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						imperfect: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						pluperfect: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						future: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						futureperfect: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						}
					},
					active: {
						present: {
							singular: {
								first:  pr.slice(0,-1) + 'or',
								second: pr + 'ris' + ' / ' +
															pr + 're',
								third:  pr + 'tur'
							},
							plural: {
								first:  pr + 'mur',
								second: pr + _('mini_'),
								third:  pr.slice(0,-1) + 'ntur'
							}
						},
						perfect: {
							singular: {
								first:  pfp + ', -a, -um sum',
								second: pfp + ', -a, -um es',
								third:  pfp + ', -a, -um est'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a sumus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a estis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a sunt')
							}
						},
						imperfect: {
							singular: {
								first:  pr + 'bar',
								second: pr + _('ba_ris') + ' / ' +
															pr + _('ba_re'),
								third:  pr + _('ba_tur')
							},
							plural: {
								first:  pr + _('ba_mur'),
								second: pr + _('ba_mini_'),
								third:  pr + 'bantur'
							}
						},
						pluperfect: {
							singular: {
								first:  pfp + ', -a, -um eram',
								second: pfp + _(', -a, -um era_s'),
								third:  pfp + ', -a, -um erat'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a era_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a era_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a erant'),
							}
						},
						future: {
							singular: {
								first:  pr + 'bor',
								second: pr + 'beris' + ' / ' +
															pr + 'bere',
								third:  pr + 'bitur'
							},
							plural: {
								first:  pr + 'bimur',
								second: pr + _('bimini_'),
								third:  pr + 'buntur'
							}
						},
						futureperfect: {
							singular: {
								first:  pfp + _(', -a, -um ero_'),
								second: pfp + ', -a, -um eris',
								third:  pfp + ', -a, -um erit'
							},
							plural: {
								first: 	pfp.slice(0,-2) + _('i_, -ae, -a erimus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a eritis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a erunt')
							}
						}
					}
				},
				imperative: {
					passive: {
						present: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						}
					},
					active: {
						present: {
							singular: {
								first: '-',
								second: pr + 're',
								third: '-'
							},
							plural: {
								first: '-',
								second: pr + _('mini_'),
								third: '-'
							}
						}
					}
				},
				subjunctive: {
					passive: {
						present: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						},
						imperfect: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						},
						perfect: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						},
						pluperfect: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						}
					},
					active: {
						present: {
							singular: {
								first:  pr.slice(0,-2) + 'ear',
								second: pr.slice(0,-2) + _('ea_ris') + ' / ' + pr.slice(0,-2) + _('ea_re'),
								third:  pr.slice(0,-2) + _('ea_tur')
							},
							plural: {
								first:  pr.slice(0,-2) + _('ea_mur'),
								second: pr.slice(0,-2) + _('ea_mini_'),
								third: 	pr.slice(0,-2) + 'eantur'
							}
						},
						imperfect: {
							singular: {
								first:  sbji + 'r',
								second: sbji + _('_ris') + ' / ' + sbji + _('_re'),
								third:  sbji + _('_tur')
							},
							plural: {
								first:  sbji + _('_mur'),
								second: sbji + _('_mini_'),
								third:  sbji + 'ntur'
							}
						},
						perfect: {
							singular: {
								first:  pfp + ', -a, -um sim',
								second: pfp + _(', -a, -um si_s'),
								third: 	pfp + ', -a, -um sit'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a si_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a si_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a sint')
							}
						},
						pluperfect: {
							singular: {
								first:  pfp + ', -a, -um essem',
								second: pfp + _(', -a, -um esse_s'),
								third: 	pfp + ', -a, -um esset'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a esse_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a esse_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a essent')
							}
						}
					}
				},
				infinitive: {
					passive:  {
						present: '-',
						perfect: '-',
						future:  '-'
					},
					active: {
						present: pr +_('ri_'),
						perfect: '-',
						future:  '-'
					}
				},
				participle: {
					active: {
						present: pr + 'ns, ' + _(st[1].slice(0,-4)) + 'ntis',
						perfect: '-',
						future:  pfp.slice(0,-2) + _('u_rus, -a, -um')
					},
					passive: {
						present: '-',
						perfect: pfp + ', -a, -um',
						future:  _(st[1].slice(0,-4)) + 'ndus, -a, -um'
					}
				}
			}
		break;

		case 'verb 2SemiDep':
			var pr   = _(st[1].slice(0,-2)),
					pfp  = _(st[2].slice(0,-4)),
					sbji = pr + 're';
			conjugation = {
				indicative: {
					active: {
						present: {
							singular: {
								first:  pr.slice(0,-1) + _('o_'),
								second: pr + 's',
								third:  pr.slice(0,-1) + 't'
							},
							plural: {
								first:  pr + 'mus',
								second: pr + 'tis',
								third:  pr.slice(0,-1) + 'nt'
							}
						},
						perfect: {
							singular: {
								first:  pfp + ', -a, -um sum',
								second: pfp + ', -a, -um es',
								third:  pfp + ', -a, -um est'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a sumus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a estis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a sunt')
							}
						},
						imperfect: {
							singular: {
								first:  pr + 'bam',
								second: pr + _('ba_s'),
								third:  pr + 'bat'
							},
							plural: {
								first:  pr + _('ba_mus'),
								second: pr + _('ba_tis'),
								third:  pr + 'bant'
							}
						},
						pluperfect: {
							singular: {
								first:  pfp + ', -a, -um eram',
								second: pfp + _(', -a, -um era_s'),
								third:  pfp + ', -a, -um erat'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a era_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a era_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a erant'),
							}
						},
						future: {
							singular: {
								first:  pr + _('bo_'),
								second: pr + 'bis',
								third:  pr + 'bit'
							},
							plural: {
								first:  pr + 'bimus',
								second: pr + 'bitis',
								third:  pr + 'bunt'
							}
						},
						futureperfect: {
							singular: {
								first:  pfp + _(', -a, -um ero_'),
								second: pfp + ', -a, -um eris',
								third:  pfp + ', -a, -um erit'
							},
							plural: {
								first: 	pfp.slice(0,-2) + _('i_, -ae, -a erimus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a eritis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a erunt')
							}
						}					},
					passive: {
						present: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						perfect: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						imperfect: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						pluperfect: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						future: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						futureperfect: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						}
					},
				},
				imperative: {
					active: {
						present: {
							singular: {
								first: '-',
								second: pr,
								third: '-'
							},
							plural: {
								first: '-',
								second: pr + 'te',
								third: '-'
							}
						}
					},
					passive: {
						present: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						}
					}
				},
				subjunctive: {
					active: {
						present: {
							singular: {
								first:  pr.slice(0,-2) + 'eam',
								second: pr.slice(0,-2) + _('ea_s'),
								third:  pr.slice(0,-2) + 'eat'
							},
							plural: {
								first:  pr.slice(0,-2) + _('ea_mus'),
								second: pr.slice(0,-2) + _('ea_tis'),
								third: 	pr.slice(0,-2) + 'eant'
							}
						},
						imperfect: {
							singular: {
								first:  sbji + 'm',
								second: sbji + _('_s'),
								third: 	sbji + 't'
							},
							plural: {
								first: 	sbji + _('_mus'),
								second: sbji + _('_tis'),
								third: 	sbji + 'nt'
							}
						},
						perfect: {
							singular: {
								first:  pfp + ', -a, -um sim',
								second: pfp + _(', -a, -um si_s'),
								third: 	pfp + ', -a, -um sit'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a si_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a si_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a sint')
							}
						},
						pluperfect: {
							singular: {
								first:  pfp + ', -a, -um essem',
								second: pfp + _(', -a, -um esse_s'),
								third: 	pfp + ', -a, -um esset'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a esse_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a esse_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a essent')
							}
						}
					},
					passive: {
						present: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						},
						imperfect: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						},
						perfect: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						},
						pluperfect: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						}
					},
				},
				infinitive: {
					active:  {
						present: pr + 're',
						perfect: '-',
						future:  '-'
					},
					passive: {
						present: '-',
						perfect: '-',
						future:  '-'
					}
				},
				participle: {
					active: {
						present: pr + 'ns, ' + _(st[1].slice(0,-3)) + 'ntis',
						perfect: '-',
						future:  pfp.slice(0,-2) + _('u_rus, -a, -um')
					},
					passive: {
						present: '-',
						perfect: pfp + ', -a, -um',
						future:  _(st[1].slice(0,-3)) + 'ndus, -a, -um'
					}
				}
			}
		break;

		case 'verb 3':
			var pr  = _(st[1].slice(0,-2)),
					pf  = _(st[2].slice(0,-2)),
					pfp = _(st[3]);
			// fix for fero_
			if (['fer', 'aufer', 'differ', 'perfer', 'refer'].indexOf(pr) !== -1)
				pr += 'e';
			conjugation = {
				indicative: {
					active: {
						present: {
							singular: {
								first:  pr.slice(0,-1) + _('o_'),
								second: pr.slice(0,-1) + 'is',
								third:  pr.slice(0,-1) + 'it'
							},
							plural: {
								first:  pr.slice(0,-1) + 'imus',
								second: pr.slice(0,-1) + 'itis',
								third:  pr.slice(0,-1) + 'unt'
							}
						},
						perfect: {
							singular: {
								first:  pf + _('i_'),
								second: pf + _('isti_'),
								third:  pf + 'it'
							},
							plural: {
								first:  pf + 'imus',
								second: pf + 'istis',
								third:  pf + _('e_runt') +
															' / ' + pf + _('e_re')
							}
						},
						imperfect: {
							singular: {
								first:  pr.slice(0,-1) + _('e_') + 'bam',
								second: pr.slice(0,-1) + _('e_') + _('ba_s'),
								third:  pr.slice(0,-1) + _('e_') + 'bat'
							},
							plural: {
								first:  pr.slice(0,-1) + _('e_') + _('ba_mus'),
								second: pr.slice(0,-1) + _('e_') + _('ba_tis'),
								third:  pr.slice(0,-1) + _('e_') + 'bant'
							}
						},
						pluperfect: {
							singular: {
								first:  pf + 'eram',
								second: pf + _('era_s'),
								third:  pf + 'erat'
							},
							plural: {
								first:  pf + _('era_mus'),
								second: pf + _('era_tis'),
								third:  pf + 'erant'
							}
						},
						future: {
							singular: {
								first:  pr.slice(0,-1) + 'am',
								second: pr.slice(0,-1) + _('e_') + 's',
								third:  pr + 't'
							},
							plural: {
								first:  pr.slice(0,-1) + _('e_') + 'mus',
								second: pr.slice(0,-1) + _('e_') + 'tis',
								third:  pr + 'nt'
							}
						},
						futureperfect: {
							singular: {
								first:  pf + _('ero_'),
								second: pf + 'eris',
								third:  pf + 'erit'
							},
							plural: {
								first:  pf + 'erimus',
								second: pf + 'eritis',
								third:  pf + 'erint'
							}
						}
					},
					passive: {
						present: {
							singular: {
								first:  pr.slice(0,-1) + 'or',
								second: pr.slice(0,-1) + 'eris' + ' / ' +
															pr.slice(0,-1) + 'ere',
								third:  pr.slice(0,-1) + 'itur'
							},
							plural: {
								first:  pr.slice(0,-1) + 'imur',
								second: pr.slice(0,-1) + _('imini_'),
								third:  pr.slice(0,-1) + 'untur'
							}
						},
						perfect: {
							singular: {
								first:  pfp + ', -a, -um sum',
								second: pfp + ', -a, -um es',
								third:  pfp + ', -a, -um est'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a sumus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a estis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a sunt')
							}
						},
						imperfect: {
							singular: {
								first:  pr.slice(0,-1) + _('e_') + 'bar',
								second: pr.slice(0,-1) + _('e_') + _('ba_ris') + ' / ' +
															pr.slice(0,-1) + _('e_') + _('ba_re'),
								third:  pr.slice(0,-1) + _('e_') + _('ba_tur')
							},
							plural: {
								first:  pr.slice(0,-1) + _('e_') + _('ba_mur'),
								second: pr.slice(0,-1) + _('e_') + _('ba_mini_'),
								third:  pr.slice(0,-1) + _('e_') + 'bantur'
							}
						},
						pluperfect: {
							singular: {
								first:  pfp + ', -a, -um eram',
								second: pfp + _(', -a, -um era_s'),
								third:  pfp + ', -a, -um erat'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a era_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a era_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a erant'),
							}
						},
						future: {
							singular: {
								first:  pr.slice(0,-1) + 'ar',
								second: pr.slice(0,-1) + _('e_') + 'ris' + ' / ' +
															pr.slice(0,-1) + _('e_') + 're',
								third:  pr.slice(0,-1) + _('e_') + 'tur'
							},
							plural: {
								first:  pr.slice(0,-1) + _('e_') + 'mur',
								second: pr.slice(0,-1) + _('e_') + _('mini_'),
								third:  pr + 'ntur'
							}
						},
						futureperfect: {
							singular: {
								first:  pfp + _(', -a, -um ero_'),
								second: pfp + ', -a, -um eris',
								third:  pfp + ', -a, -um erit'
							},
							plural: {
								first: 	pfp.slice(0,-2) + _('i_, -ae, -a erimus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a eritis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a erunt')
							}
						}
					}
				},
				imperative: {
					active: {
						present: {
							singular: {
								first: '-',
								second: pr,
								third: '-'
							},
							plural: {
								first: '-',
								second: pr.slice(0,-1) + 'ite',
								third: '-'
							}
						}
					},
					passive: {
						present: {
							singular: {
								first: '-',
								second: pr + 're',
								third: '-'
							},
							plural: {
								first: '-',
								second: pr.slice(0,-1) + _('imini_'),
								third: '-'
							}
						}
					}
				},
				subjunctive: {
					active: {
						present: {
							singular: {
								first:  pr.slice(0,-1) + 'am',
								second: pr.slice(0,-1) + _('a_s'),
								third:  pr.slice(0,-1) + 'at'
							},
							plural: {
								first:  pr.slice(0,-1) + _('a_mus'),
								second: pr.slice(0,-1) + _('a_tis'),
								third: 	pr.slice(0,-1) + 'ant'
							}
						},
						imperfect: {
							singular: {
								first:  _(st[1]) + 'm',
								second: _(st[1]) + _('_s'),
								third: 	_(st[1]) + 't'
							},
							plural: {
								first: 	_(st[1]) + _('_mus'),
								second: _(st[1]) + _('_tis'),
								third: 	_(st[1]) + 'nt'
							}
						},
						perfect: {
							singular: {
								first:  pf + 'erim',
								second: pf + 'eris',
								third: 	pf + 'erit'
							},
							plural: {
								first: 	pf + 'erimus',
								second: pf + 'eritis',
								third:  pf + 'erint'
							}
						},
						pluperfect: {
							singular: {
								first:  pf + 'issem',
								second: pf + _('isse_s'),
								third:  pf + 'isset'
							},
							plural: {
								first:  pf + _('isse_mus'),
								second: pf + _('isse_tis'),
								third:  pf + 'issent'
							}
						}
					},
					passive: {
						present: {
							singular: {
								first:  pr.slice(0,-1) + 'ar',
								second: pr.slice(0,-1) + _('a_ris') + ' / ' + pr.slice(0,-1) + _('a_re'),
								third:  pr.slice(0,-1) + _('a_tur')
							},
							plural: {
								first:  pr.slice(0,-1) + _('a_mur'),
								second: pr.slice(0,-1) + _('a_mini_'),
								third: 	pr.slice(0,-1) + 'antur'
							}
						},
						imperfect: {
							singular: {
								first:  _(st[1]) + 'r',
								second: _(st[1]) + _('_ris') + ' / ' + _(st[1]) + _('_re'),
								third:  _(st[1]) + _('_tur')
							},
							plural: {
								first:  _(st[1]) + _('_mur'),
								second: _(st[1]) + _('_mini_'),
								third:  _(st[1]) + 'ntur'
							}
						},
						perfect: {
							singular: {
								first:  pfp + ', -a, -um sim',
								second: pfp + _(', -a, -um si_s'),
								third: 	pfp + ', -a, -um sit'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a si_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a si_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a sint')
							}
						},
						pluperfect: {
							singular: {
								first:  pfp + ', -a, -um essem',
								second: pfp + _(', -a, -um esse_s'),
								third: 	pfp + ', -a, -um esset'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a esse_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a esse_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a essent')
							}
						}
					}
				},
				infinitive: {
					active: {
						present: pr + 're',
						perfect: '-',
						future:  '-'
					},
					passive: {
						present: pr.slice(0,-1) + _('i_'),
						perfect: '-',
						future:  '-'
					}
				},
				participle: {
					active: {
						present: pr + _('_ns, ') + pr + 'ntis',
						perfect: '-',
						future:  _(st[3].slice(0, (_(st[3].slice(0,-5)) === _('u_rus') ? -5 : -2))) + _('u_rus, -a, -um')
					},
					passive: {
						present: '-',
						perfect: _(st[3].slice(0,-5)) === _('u_rus') ? '-' : pfp + ', -a, -um',
						future:  pr + 'ndus, -a, -um'
					}
				}
			}
		break;

		case 'verb 3Dep':
			var pr   = _(st[1].slice(0,-2)) + 'e',
					pfp  = _(st[2].slice(0,-4)),
					sbji = pr + 're';
			conjugation = {
				indicative: {
					passive: {
						present: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						perfect: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						imperfect: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						pluperfect: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						future: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						futureperfect: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						}
					},
					active: {
						present: {
							singular: {
								first:  pr.slice(0,-1) + 'or',
								second: pr.slice(0,-1) + 'eris' + ' / ' +
															pr.slice(0,-1) + 'ere',
								third:  pr.slice(0,-1) + 'itur'
							},
							plural: {
								first:  pr.slice(0,-1) + 'imur',
								second: pr.slice(0,-1) + _('imini_'),
								third:  pr.slice(0,-1) + 'untur'
							}
						},
						perfect: {
							singular: {
								first:  pfp + ', -a, -um sum',
								second: pfp + ', -a, -um es',
								third:  pfp + ', -a, -um est'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a sumus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a estis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a sunt')
							}
						},
						imperfect: {
							singular: {
								first:  pr.slice(0,-1) + _('e_') + 'bar',
								second: pr.slice(0,-1) + _('e_') + _('ba_ris') + ' / ' +
															pr.slice(0,-1) + _('e_') + _('ba_re'),
								third:  pr.slice(0,-1) + _('e_') + _('ba_tur')
							},
							plural: {
								first:  pr.slice(0,-1) + _('e_') + _('ba_mur'),
								second: pr.slice(0,-1) + _('e_') + _('ba_mini_'),
								third:  pr.slice(0,-1) + _('e_') + 'bantur'
							}
						},
						pluperfect: {
							singular: {
								first:  pfp + ', -a, -um eram',
								second: pfp + _(', -a, -um era_s'),
								third:  pfp + ', -a, -um erat'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a era_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a era_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a erant'),
							}
						},
						future: {
							singular: {
								first:  pr.slice(0,-1) + 'ar',
								second: pr.slice(0,-1) + _('e_') + 'ris' + ' / ' +
															pr.slice(0,-1) + _('e_') + 're',
								third:  pr.slice(0,-1) + _('e_') + 'tur'
							},
							plural: {
								first:  pr.slice(0,-1) + _('e_') + 'mur',
								second: pr.slice(0,-1) + _('e_') + _('mini_'),
								third:  pr + 'ntur'
							}
						},
						futureperfect: {
							singular: {
								first:  pfp + _(', -a, -um ero_'),
								second: pfp + ', -a, -um eris',
								third:  pfp + ', -a, -um erit'
							},
							plural: {
								first: 	pfp.slice(0,-2) + _('i_, -ae, -a erimus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a eritis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a erunt')
							}
						}
					}
				},
				imperative: {
					passive: {
						present: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						}
					},
					active: {
						present: {
							singular: {
								first: '-',
								second: pr + 're',
								third: '-'
							},
							plural: {
								first: '-',
								second: pr.slice(0,-1) + _('imini_'),
								third: '-'
							}
						}
					}
				},
				subjunctive: {
					passive: {
						present: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						},
						imperfect: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						},
						perfect: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						},
						pluperfect: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						}
					},
					active: {
						present: {
							singular: {
								first:  pr.slice(0,-1) + 'ar',
								second: pr.slice(0,-1) + _('a_ris') + ' / ' + pr.slice(0,-1) + _('a_re'),
								third:  pr.slice(0,-1) + _('a_tur')
							},
							plural: {
								first:  pr.slice(0,-1) + _('a_mur'),
								second: pr.slice(0,-1) + _('a_mini_'),
								third: 	pr.slice(0,-1) + 'antur'
							}
						},
						imperfect: {
							singular: {
								first:  sbji + 'r',
								second: sbji + _('_ris') + ' / ' + sbji + _('_re'),
								third:  sbji + _('_tur')
							},
							plural: {
								first:  sbji + _('_mur'),
								second: sbji + _('_mini_'),
								third:  sbji + 'ntur'
							}
						},
						perfect: {
							singular: {
								first:  pfp + ', -a, -um sim',
								second: pfp + _(', -a, -um si_s'),
								third: 	pfp + ', -a, -um sit'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a si_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a si_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a sint')
							}
						},
						pluperfect: {
							singular: {
								first:  pfp + ', -a, -um essem',
								second: pfp + _(', -a, -um esse_s'),
								third: 	pfp + ', -a, -um esset'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a esse_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a esse_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a essent')
							}
						}
					}
				},
				infinitive: {
					passive: {
						present: pr + 're',
						perfect: '-',
						future:  '-'
					},
					active: {
						present: pr.slice(0,-1) + _('i_'),
						perfect: '-',
						future:  '-'
					}
				},
				participle: {
					active: {
						present: pr + _('_ns, ') + pr + 'ntis',
						perfect: '-',
						future:  pfp.slice(0,-2) + _('u_rus, -a, -um')
					},
					passive: {
						present: '-',
						perfect: pfp + ', -a, -um',
						future:  pr + 'ndus, -a, -um'
					}
				}
			}
		break;

		case 'verb 3i':
			var pr  = _(st[1].slice(0,-2)),
					pf  = _(st[2].slice(0,-2)),
					pfp = _(st[3]);
			conjugation = {
				indicative: {
					active: {
						present: {
							singular: {
								first:  pr.slice(0,-1) + _('io_'),
								second: pr.slice(0,-1) + 'is',
								third:  pr.slice(0,-1) + 'it'
							},
							plural: {
								first:  pr.slice(0,-1) + 'imus',
								second: pr.slice(0,-1) + 'itis',
								third:  pr.slice(0,-1) + 'iunt'
							}
						},
						perfect: {
							singular: {
								first:  pf + _('i_'),
								second: pf + _('isti_'),
								third:  pf + 'it'
							},
							plural: {
								first:  pf + 'imus',
								second: pf + 'istis',
								third:  pf + _('e_runt') +
															' / ' + pf + _('e_re')
							}
						},
						imperfect: {
							singular: {
								first:  pr.slice(0,-1) + _('ie_') + 'bam',
								second: pr.slice(0,-1) + _('ie_') + _('ba_s'),
								third:  pr.slice(0,-1) + _('ie_') + 'bat'
							},
							plural: {
								first:  pr.slice(0,-1) + _('ie_') + _('ba_mus'),
								second: pr.slice(0,-1) + _('ie_') + _('ba_tis'),
								third:  pr.slice(0,-1) + _('ie_') + 'bant'
							}
						},
						pluperfect: {
							singular: {
								first:  pf + 'eram',
								second: pf + _('era_s'),
								third:  pf + 'erat'
							},
							plural: {
								first:  pf + _('era_mus'),
								second: pf + _('era_tis'),
								third:  pf + 'erant'
							}
						},
						future: {
							singular: {
								first:  pr.slice(0,-1) + 'iam',
								second: pr.slice(0,-1) + _('ie_') + 's',
								third:  pr.slice(0,-1) + 'iet'
							},
							plural: {
								first:  pr.slice(0,-1) + _('ie_') + 'mus',
								second: pr.slice(0,-1) + _('ie_') + 'tis',
								third:  pr.slice(0,-1) + 'ient'
							}
						},
						futureperfect: {
							singular: {
								first:  pf + _('ero_'),
								second: pf + 'eris',
								third:  pf + 'erit'
							},
							plural: {
								first:  pf + 'erimus',
								second: pf + 'eritis',
								third:  pf + 'erint'
							}
						}
					},
					passive: {
						present: {
							singular: {
								first:  pr.slice(0,-1) + 'ior',
								second: pr.slice(0,-1) + 'eris' + ' / ' +
															pr.slice(0,-1) + 'ere',
								third:  pr.slice(0,-1) + 'itur'
							},
							plural: {
								first:  pr.slice(0,-1) + 'imur',
								second: pr.slice(0,-1) + _('imini_'),
								third:  pr.slice(0,-1) + 'iuntur'
							}
						},
						perfect: {
							singular: {
								first:  pfp + ', -a, -um sum',
								second: pfp + ', -a, -um es',
								third:  pfp + ', -a, -um est'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a sumus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a estis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a sunt')
							}
						},
						imperfect: {
							singular: {
								first:  pr.slice(0,-1) + _('ie_') + 'bar',
								second: pr.slice(0,-1) + _('ie_') + _('ba_ris') + ' / ' +
															pr.slice(0,-1) + _('ie_') + _('ba_re'),
								third:  pr.slice(0,-1) + _('ie_') + _('ba_tur')
							},
							plural: {
								first:  pr.slice(0,-1) + _('ie_') + _('ba_mur'),
								second: pr.slice(0,-1) + _('ie_') + _('ba_mini_'),
								third:  pr.slice(0,-1) + _('ie_') + 'bantur'
							}
						},
						pluperfect: {
							singular: {
								first:  pfp + ', -a, -um eram',
								second: pfp + _(', -a, -um era_s'),
								third:  pfp + ', -a, -um erat'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a era_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a era_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a erant'),
							}
						},
						future: {
							singular: {
								first:  pr.slice(0,-1) + 'iar',
								second: pr.slice(0,-1) + _('ie_') + 'ris' + ' / ' +
															pr.slice(0,-1) + _('ie_') + 're',
								third:  pr.slice(0,-1) + _('ie_') + 'tur'
							},
							plural: {
								first:  pr.slice(0,-1) + _('ie_') + 'mur',
								second: pr.slice(0,-1) + _('ie_') + _('mini_'),
								third:  pr.slice(0,-1) + 'ientur'
							}
						},
						futureperfect: {
							singular: {
								first:  pfp + _(', -a, -um ero_'),
								second: pfp + ', -a, -um eris',
								third:  pfp + ', -a, -um erit'
							},
							plural: {
								first: 	pfp.slice(0,-2) + _('i_, -ae, -a erimus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a eritis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a erunt')
							}
						}
					}
				},
				imperative: {
					active: {
						present: {
							singular: {
								first: '-',
								second: pr,
								third: '-'
							},
							plural: {
								first: '-',
								second: pr.slice(0,-1) + 'ite',
								third: '-'
							}
						}
					},
					passive: {
						present: {
							singular: {
								first: '-',
								second: pr + 're',
								third: '-'
							},
							plural: {
								first: '-',
								second: pr.slice(0,-1) + _('imini_'),
								third: '-'
							}
						}
					}
				},
				subjunctive: {
					active: {
						present: {
							singular: {
								first:  pr.slice(0,-1) + 'iam',
								second: pr.slice(0,-1) + _('ia_s'),
								third:  pr.slice(0,-1) + 'iat'
							},
							plural: {
								first:  pr.slice(0,-1) + _('ia_mus'),
								second: pr.slice(0,-1) + _('ia_tis'),
								third: 	pr.slice(0,-1) + 'iant'
							}
						},
						imperfect: {
							singular: {
								first:  _(st[1]) + 'm',
								second: _(st[1]) + _('_s'),
								third: 	_(st[1]) + 't'
							},
							plural: {
								first: 	_(st[1]) + _('_mus'),
								second: _(st[1]) + _('_tis'),
								third: 	_(st[1]) + 'nt'
							}
						},
						perfect: {
							singular: {
								first:  pf + 'erim',
								second: pf + 'eris',
								third: 	pf + 'erit'
							},
							plural: {
								first: 	pf + 'erimus',
								second: pf + 'eritis',
								third:  pf + 'erint'
							}
						},
						pluperfect: {
							singular: {
								first:  pf + 'issem',
								second: pf + _('isse_s'),
								third:  pf + 'isset'
							},
							plural: {
								first:  pf + _('isse_mus'),
								second: pf + _('isse_tis'),
								third:  pf + 'issent'
							}
						}
					},
					passive: {
						present: {
							singular: {
								first:  pr.slice(0,-1) + 'iar',
								second: pr.slice(0,-1) + _('ia_ris') + ' / ' + pr.slice(0,-1) + _('ia_re'),
								third:  pr.slice(0,-1) + _('ia_tur')
							},
							plural: {
								first:  pr.slice(0,-1) + _('ia_mur'),
								second: pr.slice(0,-1) + _('ia_mini_'),
								third: 	pr.slice(0,-1) + 'iantur'
							}
						},
						imperfect: {
							singular: {
								first:  _(st[1]) + 'r',
								second: _(st[1]) + _('_ris') + ' / ' + _(st[1]) + _('_re'),
								third:  _(st[1]) + _('_tur')
							},
							plural: {
								first:  _(st[1]) + _('_mur'),
								second: _(st[1]) + _('_mini_'),
								third:  _(st[1]) + 'ntur'
							}
						},
						perfect: {
							singular: {
								first:  pfp + ', -a, -um sim',
								second: pfp + _(', -a, -um si_s'),
								third: 	pfp + ', -a, -um sit'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a si_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a si_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a sint')
							}
						},
						pluperfect: {
							singular: {
								first:  pfp + ', -a, -um essem',
								second: pfp + _(', -a, -um esse_s'),
								third: 	pfp + ', -a, -um esset'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a esse_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a esse_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a essent')
							}
						}
					}
				},
				infinitive: {
					active:  {
						present: pr + 're',
						perfect: '-',
						future:  '-'
					},
					passive: {
						present: pr.slice(0,-1) + _('i_'),
						perfect: '-',
						future:  '-'
					}
				},
				participle: {
					active: {
						present: pr.slice(0,-1) + _('ie_ns, ') + pr.slice(0,-1) + 'ientis',
						perfect: '-',
						future:  _(st[3].slice(0, (_(st[3].slice(0,-5)) === _('u_rus') ? -5 : -2))) + _('u_rus, -a, -um')
					},
					passive: {
						present: '-',
						perfect: _(st[3].slice(0,-5)) === _('u_rus') ? '-' : pfp + ', -a, -um',
						future:  pr.slice(0,-1) + 'iendus, -a, -um'
					}
				}
			}
		break;

		case 'verb 3iDep':
			var pr   = _(st[1].slice(0,-2)) + 'e',
					pfp  = _(st[2].slice(0,-4)),
					sbji = pr + 're';
			conjugation = {
				indicative: {
					passive: {
						present: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						perfect: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						imperfect: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						pluperfect: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						future: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						futureperfect: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						}
					},
					active: {
						present: {
							singular: {
								first:  pr.slice(0,-1) + 'ior',
								second: pr.slice(0,-1) + 'eris' + ' / ' +
															pr.slice(0,-1) + 'ere',
								third:  pr.slice(0,-1) + 'itur'
							},
							plural: {
								first:  pr.slice(0,-1) + 'imur',
								second: pr.slice(0,-1) + _('imini_'),
								third:  pr.slice(0,-1) + 'iuntur'
							}
						},
						perfect: {
							singular: {
								first:  pfp + ', -a, -um sum',
								second: pfp + ', -a, -um es',
								third:  pfp + ', -a, -um est'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a sumus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a estis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a sunt')
							}
						},
						imperfect: {
							singular: {
								first:  pr.slice(0,-1) + _('ie_') + 'bar',
								second: pr.slice(0,-1) + _('ie_') + _('ba_ris') + ' / ' +
															pr.slice(0,-1) + _('ie_') + _('ba_re'),
								third:  pr.slice(0,-1) + _('ie_') + _('ba_tur')
							},
							plural: {
								first:  pr.slice(0,-1) + _('ie_') + _('ba_mur'),
								second: pr.slice(0,-1) + _('ie_') + _('ba_mini_'),
								third:  pr.slice(0,-1) + _('ie_') + 'bantur'
							}
						},
						pluperfect: {
							singular: {
								first:  pfp + ', -a, -um eram',
								second: pfp + _(', -a, -um era_s'),
								third:  pfp + ', -a, -um erat'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a era_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a era_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a erant'),
							}
						},
						future: {
							singular: {
								first:  pr.slice(0,-1) + 'iar',
								second: pr.slice(0,-1) + _('ie_') + 'ris' + ' / ' +
															pr.slice(0,-1) + _('ie_') + 're',
								third:  pr.slice(0,-1) + _('ie_') + 'tur'
							},
							plural: {
								first:  pr.slice(0,-1) + _('ie_') + 'mur',
								second: pr.slice(0,-1) + _('ie_') + _('mini_'),
								third:  pr.slice(0,-1) + 'ientur'
							}
						},
						futureperfect: {
							singular: {
								first:  pfp + _(', -a, -um ero_'),
								second: pfp + ', -a, -um eris',
								third:  pfp + ', -a, -um erit'
							},
							plural: {
								first: 	pfp.slice(0,-2) + _('i_, -ae, -a erimus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a eritis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a erunt')
							}
						}
					}
				},
				imperative: {
					passive: {
						present: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						}
					},
					active: {
						present: {
							singular: {
								first: '-',
								second: pr + 're',
								third: '-'
							},
							plural: {
								first: '-',
								second: pr.slice(0,-1) + _('imini_'),
								third: '-'
							}
						}
					}
				},
				subjunctive: {
					passive: {
						present: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						},
						imperfect: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						},
						perfect: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						},
						pluperfect: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						}
					},
					active: {
						present: {
							singular: {
								first:  pr.slice(0,-1) + 'iar',
								second: pr.slice(0,-1) + _('ia_ris') + ' / ' + pr.slice(0,-1) + _('ia_re'),
								third:  pr.slice(0,-1) + _('ia_tur')
							},
							plural: {
								first:  pr.slice(0,-1) + _('ia_mur'),
								second: pr.slice(0,-1) + _('ia_mini_'),
								third: 	pr.slice(0,-1) + 'iantur'
							}
						},
						imperfect: {
							singular: {
								first:  sbji + 'r',
								second: sbji + _('_ris') + ' / ' + sbji + _('_re'),
								third:  sbji + _('_tur')
							},
							plural: {
								first:  sbji + _('_mur'),
								second: sbji + _('_mini_'),
								third:  sbji + 'ntur'
							}
						},
						perfect: {
							singular: {
								first:  pfp + ', -a, -um sim',
								second: pfp + _(', -a, -um si_s'),
								third: 	pfp + ', -a, -um sit'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a si_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a si_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a sint')
							}
						},
						pluperfect: {
							singular: {
								first:  pfp + ', -a, -um essem',
								second: pfp + _(', -a, -um esse_s'),
								third: 	pfp + ', -a, -um esset'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a esse_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a esse_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a essent')
							}
						}
					}
				},
				infinitive: {
					passive:  {
						present: '-',
						perfect: '-',
						future:  '-'
					},
					active: {
						present: pr.slice(0,-1) + _('i_'),
						perfect: '-',
						future:  '-'
					}
				},
				participle: {
					active: {
						present: pr.slice(0,-1) + _('ie_ns, ') + pr.slice(0,-1) + 'ientis',
						perfect: '-',
						future:  pfp.slice(0,-2) + _('u_rus, -a, -um')
					},
					passive: {
						present: '-',
						perfect: pfp + ', -a, -um',
						future:  pr.slice(0,-1) + 'iendus, -a, -um'
					}
				}
			}
		break;

		case 'verb 4':
			var pr  = _(st[1].slice(0,-2)),
					pf  = _(st[2].slice(0,-2)),
					pfp = _(st[3]);
			conjugation = {
				indicative: {
					active: {
						present: {
							singular: {
								first:  pr.slice(0,-2) + _('io_'),
								second: pr + 's',
								third:  pr.slice(0,-2) + 'it'
							},
							plural: {
								first:  pr + 'mus',
								second: pr + 'tis',
								third:  pr.slice(0,-2) + 'iunt'
							}
						},
						perfect: {
							singular: {
								first:  pf + _('i_'),
								second: pf + _('isti_'),
								third:  pf + 'it'
							},
							plural: {
								first:  pf + 'imus',
								second: pf + 'istis',
								third:  pf + _('e_runt') +
															' / ' + pf + _('e_re')
							}
						},
						imperfect: {
							singular: {
								first:  pr.slice(0,-2) + _('ie_') + 'bam',
								second: pr.slice(0,-2) + _('ie_') + _('ba_s'),
								third:  pr.slice(0,-2) + _('ie_') + 'bat'
							},
							plural: {
								first:  pr.slice(0,-2) + _('ie_') + _('ba_mus'),
								second: pr.slice(0,-2) + _('ie_') + _('ba_tis'),
								third:  pr.slice(0,-2) + _('ie_') + 'bant'
							}
						},
						pluperfect: {
							singular: {
								first:  pf + 'eram',
								second: pf + _('era_s'),
								third:  pf + 'erat'
							},
							plural: {
								first:  pf + _('era_mus'),
								second: pf + _('era_tis'),
								third:  pf + 'erant'
							}
						},
						future: {
							singular: {
								first:  pr.slice(0,-2) + 'iam',
								second: pr.slice(0,-2) + _('ie_') + 's',
								third:  pr.slice(0,-2) + 'iet'
							},
							plural: {
								first:  pr.slice(0,-2) + _('ie_') + 'mus',
								second: pr.slice(0,-2) + _('ie_') + 'tis',
								third:  pr.slice(0,-2) + 'ient'
							}
						},
						futureperfect: {
							singular: {
								first:  pf + _('ero_'),
								second: pf + 'eris',
								third:  pf + 'erit'
							},
							plural: {
								first:  pf + 'erimus',
								second: pf + 'eritis',
								third:  pf + 'erint'
							}
						}
					},
					passive: {
						present: {
							singular: {
								first:  pr.slice(0,-2) + 'ior',
								second: pr + 'ris' + ' / ' +
															pr + 're',
								third:  pr + 'tur'
							},
							plural: {
								first:  pr + 'mur',
								second: pr + _('mini_'),
								third:  pr.slice(0,-2) + 'iuntur'
							}
						},
						perfect: {
							singular: {
								first:  pfp + ', -a, -um sum',
								second: pfp + ', -a, -um es',
								third:  pfp + ', -a, -um est'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a sumus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a estis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a sunt')
							}
						},
						imperfect: {
							singular: {
								first:  pr.slice(0,-2) + _('ie_') + 'bar',
								second: pr.slice(0,-2) + _('ie_') + _('ba_ris') + ' / ' +
															pr.slice(0,-2) + _('ie_') + _('ba_re'),
								third:  pr.slice(0,-2) + _('ie_') + _('ba_tur')
							},
							plural: {
								first:  pr.slice(0,-2) + _('ie_') + _('ba_mur'),
								second: pr.slice(0,-2) + _('ie_') + _('ba_mini_'),
								third:  pr.slice(0,-2) + _('ie_') + 'bantur'
							}
						},
						pluperfect: {
							singular: {
								first:  pfp + ', -a, -um eram',
								second: pfp + _(', -a, -um era_s'),
								third:  pfp + ', -a, -um erat'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a era_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a era_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a erant'),
							}
						},
						future: {
							singular: {
								first:  pr.slice(0,-2) + 'iar',
								second: pr.slice(0,-2) + _('ie_') + 'ris' + ' / ' +
															pr.slice(0,-2) + _('ie_') + 're',
								third:  pr.slice(0,-2) + _('ie_') + 'tur'
							},
							plural: {
								first:  pr.slice(0,-2) + _('ie_') + 'mur',
								second: pr.slice(0,-2) + _('ie_') + _('mini_'),
								third:  pr.slice(0,-2) + 'ientur'
							}
						},
						futureperfect: {
							singular: {
								first:  pfp + _(', -a, -um ero_'),
								second: pfp + ', -a, -um eris',
								third:  pfp + ', -a, -um erit'
							},
							plural: {
								first: 	pfp.slice(0,-2) + _('i_, -ae, -a erimus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a eritis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a erunt')
							}
						}
					}
				},
				imperative: {
					active: {
						present: {
							singular: {
								first: '-',
								second: pr,
								third: '-'
							},
							plural: {
								first: '-',
								second: pr + 'te',
								third: '-'
							}
						}
					},
					passive: {
						present: {
							singular: {
								first: '-',
								second: pr + 're',
								third: '-'
							},
							plural: {
								first: '-',
								second: pr + _('mini_'),
								third: '-'
							}
						}
					}
				},
				subjunctive: {
					active: {
						present: {
							singular: {
								first:  pr.slice(0,-2) + 'iam',
								second: pr.slice(0,-2) + _('ia_s'),
								third:  pr.slice(0,-2) + 'iat'
							},
							plural: {
								first:  pr.slice(0,-2) + _('ia_mus'),
								second: pr.slice(0,-2) + _('ia_tis'),
								third: 	pr.slice(0,-2) + 'iant'
							}
						},
						imperfect: {
							singular: {
								first:  _(st[1]) + 'm',
								second: _(st[1]) + _('_s'),
								third: 	_(st[1]) + 't'
							},
							plural: {
								first: 	_(st[1]) + _('_mus'),
								second: _(st[1]) + _('_tis'),
								third: 	_(st[1]) + 'nt'
							}
						},
						perfect: {
							singular: {
								first:  pf + 'erim',
								second: pf + 'eris',
								third: 	pf + 'erit'
							},
							plural: {
								first: 	pf + 'erimus',
								second: pf + 'eritis',
								third:  pf + 'erint'
							}
						},
						pluperfect: {
							singular: {
								first:  pf + 'issem',
								second: pf + _('isse_s'),
								third:  pf + 'isset'
							},
							plural: {
								first:  pf + _('isse_mus'),
								second: pf + _('isse_tis'),
								third:  pf + 'issent'
							}
						}
					},
					passive: {
						present: {
							singular: {
								first:  pr.slice(0,-2) + 'iar',
								second: pr.slice(0,-2) + _('ia_ris') + ' / ' + pr.slice(0,-2) + _('ia_re'),
								third:  pr.slice(0,-2) + _('ia_tur')
							},
							plural: {
								first:  pr.slice(0,-2) + _('ia_mur'),
								second: pr.slice(0,-2) + _('ia_mini_'),
								third: 	pr.slice(0,-2) + 'iantur'
							}
						},
						imperfect: {
							singular: {
								first:  _(st[1]) + 'r',
								second: _(st[1]) + _('_ris') + ' / ' + _(st[1]) + _('_re'),
								third:  _(st[1]) + _('_tur')
							},
							plural: {
								first:  _(st[1]) + _('_mur'),
								second: _(st[1]) + _('_mini_'),
								third:  _(st[1]) + 'ntur'
							}
						},
						perfect: {
							singular: {
								first:  pfp + ', -a, -um sim',
								second: pfp + _(', -a, -um si_s'),
								third: 	pfp + ', -a, -um sit'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a si_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a si_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a sint')
							}
						},
						pluperfect: {
							singular: {
								first:  pfp + ', -a, -um essem',
								second: pfp + _(', -a, -um esse_s'),
								third: 	pfp + ', -a, -um esset'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a esse_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a esse_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a essent')
							}
						}
					}
				},
				infinitive: {
					active:  {
						present: pr + 're',
						perfect: '-',
						future:  '-'
					},
					passive: {
						present: pr + _('ri_'),
						perfect: '-',
						future:  '-'
					}
				},
				participle: {
					active: {
						present: _(st[1].slice(0,-3)) + _('e_ns, ') + _(st[1].slice(0,-3)) + 'entis',
						perfect: '-',
						future:  _(st[3].slice(0, (_(st[3].slice(0,-5)) === _('u_rus') ? -5 : -2))) + _('u_rus, -a, -um')
					},
					passive: {
						present: '-',
						perfect: _(st[3].slice(0,-5)) === _('u_rus') ? '-' : pfp + ', -a, -um',
						future:  _(st[1].slice(0,-3))  + 'endus, -a, -um'
					}
				}
			}
		break;

		case 'verb 4Dep':
			var pr   = _(st[1].slice(0,-3)),
					pfp  = _(st[2].slice(0,-4)),
					sbji = pr + 're';
			conjugation = {
				indicative: {
					passive: {
						present: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						perfect: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						imperfect: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						pluperfect: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						future: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						},
						futureperfect: {
							singular: {
								first: '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first: '-',
								second: '-',
								third:  '-'
							}
						}
					},
					active: {
						present: {
							singular: {
								first:  pr.slice(0,-2) + 'ior',
								second: pr + 'ris' + ' / ' +
															pr + 're',
								third:  pr + 'tur'
							},
							plural: {
								first:  pr + 'mur',
								second: pr + _('mini_'),
								third:  pr.slice(0,-2) + 'iuntur'
							}
						},
						perfect: {
							singular: {
								first:  pfp + ', -a, -um sum',
								second: pfp + ', -a, -um es',
								third:  pfp + ', -a, -um est'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a sumus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a estis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a sunt')
							}
						},
						imperfect: {
							singular: {
								first:  pr.slice(0,-2) + _('ie_') + 'bar',
								second: pr.slice(0,-2) + _('ie_') + _('ba_ris') + ' / ' +
															pr.slice(0,-2) + _('ie_') + _('ba_re'),
								third:  pr.slice(0,-2) + _('ie_') + _('ba_tur')
							},
							plural: {
								first:  pr.slice(0,-2) + _('ie_') + _('ba_mur'),
								second: pr.slice(0,-2) + _('ie_') + _('ba_mini_'),
								third:  pr.slice(0,-2) + _('ie_') + 'bantur'
							}
						},
						pluperfect: {
							singular: {
								first:  pfp + ', -a, -um eram',
								second: pfp + _(', -a, -um era_s'),
								third:  pfp + ', -a, -um erat'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a era_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a era_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a erant'),
							}
						},
						future: {
							singular: {
								first:  pr.slice(0,-2) + 'iar',
								second: pr.slice(0,-2) + _('ie_') + 'ris' + ' / ' +
															pr.slice(0,-2) + _('ie_') + 're',
								third:  pr.slice(0,-2) + _('ie_') + 'tur'
							},
							plural: {
								first:  pr.slice(0,-2) + _('ie_') + 'mur',
								second: pr.slice(0,-2) + _('ie_') + _('mini_'),
								third:  pr.slice(0,-2) + 'ientur'
							}
						},
						futureperfect: {
							singular: {
								first:  pfp + _(', -a, -um ero_'),
								second: pfp + ', -a, -um eris',
								third:  pfp + ', -a, -um erit'
							},
							plural: {
								first: 	pfp.slice(0,-2) + _('i_, -ae, -a erimus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a eritis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a erunt')
							}
						}
					}
				},
				imperative: {
					passive: {
						present: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						}
					},
					active: {
						present: {
							singular: {
								first: '-',
								second: pr + 're',
								third: '-'
							},
							plural: {
								first: '-',
								second: pr + _('mini_'),
								third: '-'
							}
						}
					}
				},
				subjunctive: {
					passive: {
						present: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						},
						imperfect: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						},
						perfect: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						},
						pluperfect: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						}
					},
					active: {
						present: {
							singular: {
								first:  pr.slice(0,-2) + 'iar',
								second: pr.slice(0,-2) + _('ia_ris') + ' / ' + pr.slice(0,-2) + _('ia_re'),
								third:  pr.slice(0,-2) + _('ia_tur')
							},
							plural: {
								first:  pr.slice(0,-2) + _('ia_mur'),
								second: pr.slice(0,-2) + _('ia_mini_'),
								third: 	pr.slice(0,-2) + 'iantur'
							}
						},
						imperfect: {
							singular: {
								first:  sbji + 'r',
								second: sbji + _('_ris') + ' / ' + sbji + _('_re'),
								third:  sbji + _('_tur')
							},
							plural: {
								first:  sbji + _('_mur'),
								second: sbji + _('_mini_'),
								third:  sbji + 'ntur'
							}
						},
						perfect: {
							singular: {
								first:  pfp + ', -a, -um sim',
								second: pfp + _(', -a, -um si_s'),
								third: 	pfp + ', -a, -um sit'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a si_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a si_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a sint')
							}
						},
						pluperfect: {
							singular: {
								first:  pfp + ', -a, -um essem',
								second: pfp + _(', -a, -um esse_s'),
								third: 	pfp + ', -a, -um esset'
							},
							plural: {
								first:  pfp.slice(0,-2) + _('i_, -ae, -a esse_mus'),
								second: pfp.slice(0,-2) + _('i_, -ae, -a esse_tis'),
								third:  pfp.slice(0,-2) + _('i_, -ae, -a essent')
							}
						}
					}
				},
				infinitive: {
					passive:  {
						present: '-',
						perfect: '-',
						future:  '-'
					},
					active: {
						present: pr + _('ri_'),
						perfect: '-',
						future:  '-'
					}
				},
				participle: {
					active: {
						present: _(st[1].slice(0,-4)) + _('e_ns, ') + _(st[1].slice(0,-4)) + 'entis',
						perfect: '-',
						future:  pfp.slice(0,-2) + _('u_rus, -a, -um')
					},
					passive: {
						present: '-',
						perfect: pfp + ', -a, -um',
						future:  _(st[1].slice(0,-4)) + 'endus, -a, -um'
					}
				}
			}
		break;

		case 'verb Irr':
			conjugation = {
				indicative: {
					active: {
						present: {
							singular: {
								first:  syn.indicative.active.present.singular.first,
								second: syn.indicative.active.present.singular.second,
								third:  syn.indicative.active.present.singular.third
							},
							plural: {
								first:  syn.indicative.active.present.plural.first,
								second: syn.indicative.active.present.plural.second,
								third:  syn.indicative.active.present.plural.third
							}
						},
						perfect: {
							singular: {
								first:  syn.indicative.active.perfect.singular.first,
								second: syn.indicative.active.perfect.singular.second,
								third:  syn.indicative.active.perfect.singular.third
							},
							plural: {
								first:  syn.indicative.active.perfect.plural.first,
								second: syn.indicative.active.perfect.plural.second,
								third:  syn.indicative.active.perfect.plural.third
							}
						},
						imperfect: {
							singular: {
								first:  syn.indicative.active.imperfect.singular.first,
								second: syn.indicative.active.imperfect.singular.second,
								third:  syn.indicative.active.imperfect.singular.third
							},
							plural: {
								first:  syn.indicative.active.imperfect.plural.first,
								second: syn.indicative.active.imperfect.plural.second,
								third:  syn.indicative.active.imperfect.plural.third
							}
						},
						pluperfect: {
							singular: {
								first:  syn.indicative.active.pluperfect.singular.first,
								second: syn.indicative.active.pluperfect.singular.second,
								third:  syn.indicative.active.pluperfect.singular.third
							},
							plural: {
								first:  syn.indicative.active.pluperfect.plural.first,
								second: syn.indicative.active.pluperfect.plural.second,
								third:  syn.indicative.active.pluperfect.plural.third
							}
						},
						future: {
							singular: {
								first:  syn.indicative.active.future.singular.first,
								second: syn.indicative.active.future.singular.second,
								third:  syn.indicative.active.future.singular.third
							},
							plural: {
								first:  syn.indicative.active.future.plural.first,
								second: syn.indicative.active.future.plural.second,
								third:  syn.indicative.active.future.plural.third
							}
						},
						futureperfect: {
							singular: {
								first:  syn.indicative.active.futureperfect.singular.first,
								second: syn.indicative.active.futureperfect.singular.second,
								third:  syn.indicative.active.futureperfect.singular.third
							},
							plural: {
								first:  syn.indicative.active.futureperfect.plural.first,
								second: syn.indicative.active.futureperfect.plural.second,
								third:  syn.indicative.active.futureperfect.plural.third
							}
						}
					},
					passive: {
						present: {
							singular: {
								first:  syn.indicative.passive.present.singular.first,
								second: syn.indicative.passive.present.singular.second,
								third:  syn.indicative.passive.present.singular.third
							},
							plural: {
								first:  syn.indicative.passive.present.plural.first,
								second: syn.indicative.passive.present.plural.second,
								third:  syn.indicative.passive.present.plural.third
							}
						},
						perfect: {
							singular: {
								first:  syn.indicative.passive.perfect.singular.first,
								second: syn.indicative.passive.perfect.singular.second,
								third:  syn.indicative.passive.perfect.singular.third
							},
							plural: {
								first:  syn.indicative.passive.perfect.plural.first,
								second: syn.indicative.passive.perfect.plural.second,
								third:  syn.indicative.passive.perfect.plural.third
							}
						},
						imperfect: {
							singular: {
								first:  syn.indicative.passive.imperfect.singular.first,
								second: syn.indicative.passive.imperfect.singular.second,
								third:  syn.indicative.passive.imperfect.singular.third
							},
							plural: {
								first:  syn.indicative.passive.imperfect.plural.first,
								second: syn.indicative.passive.imperfect.plural.second,
								third:  syn.indicative.passive.imperfect.plural.third
							}
						},
						pluperfect: {
							singular: {
								first:  syn.indicative.passive.pluperfect.singular.first,
								second: syn.indicative.passive.pluperfect.singular.second,
								third:  syn.indicative.passive.pluperfect.singular.third
							},
							plural: {
								first:  syn.indicative.passive.pluperfect.plural.first,
								second: syn.indicative.passive.pluperfect.plural.second,
								third:  syn.indicative.passive.pluperfect.plural.third
							}
						},
						future: {
							singular: {
								first:  syn.indicative.passive.future.singular.first,
								second: syn.indicative.passive.future.singular.second,
								third:  syn.indicative.passive.future.singular.third
							},
							plural: {
								first:  syn.indicative.passive.future.plural.first,
								second: syn.indicative.passive.future.plural.second,
								third:  syn.indicative.passive.future.plural.third
							}
						},
						futureperfect: {
							singular: {
								first:  syn.indicative.passive.futureperfect.singular.first,
								second: syn.indicative.passive.futureperfect.singular.second,
								third:  syn.indicative.passive.futureperfect.singular.third
							},
							plural: {
								first: 	syn.indicative.passive.futureperfect.plural.first,
								second: syn.indicative.passive.futureperfect.plural.second,
								third:  syn.indicative.passive.futureperfect.plural.third
							}
						}
					}
				},
				imperative: {
					active: {
						present: {
							singular: {
								first: '-',
								second: syn.imperative.active.present.singular.second,
								third: '-'
							},
							plural: {
								first: '-',
								second: syn.imperative.active.present.plural.second,
								third: '-'
							}
						}
					},
					passive: {
						present: {
							singular: {
								first: '-',
								second: syn.imperative.passive.present.singular.second,
								third: '-'
							},
							plural: {
								first: '-',
								second: syn.imperative.passive.present.plural.second,
								third: '-'
							}
						}
					}
				},
				subjunctive: {
					active: {
						present: {
							singular: {
								first:  syn.subjunctive.active.present,
								second: syn.subjunctive.active.present,
								third:  syn.subjunctive.active.present
							},
							plural: {
								first:  syn.subjunctive.active.present,
								second: syn.subjunctive.active.present,
								third: 	syn.subjunctive.active.present
							}
						},
						imperfect: {
							singular: {
								first:  syn.subjunctive.active.imperfect,
								second: syn.subjunctive.active.imperfect,
								third: 	syn.subjunctive.active.imperfect
							},
							plural: {
								first: 	syn.subjunctive.active.imperfect,
								second: syn.subjunctive.active.imperfect,
								third: 	syn.subjunctive.active.imperfect
							}
						},
						perfect: {
							singular: {
								first:  syn.subjunctive.active.perfect,
								second: syn.subjunctive.active.perfect,
								third: 	syn.subjunctive.active.perfect
							},
							plural: {
								first: 	syn.subjunctive.active.perfect,
								second: syn.subjunctive.active.perfect,
								third:  syn.subjunctive.active.perfect
							}
						},
						pluperfect: {
							singular: {
								first:  syn.subjunctive.active.pluperfect,
								second: syn.subjunctive.active.pluperfect,
								third:  syn.subjunctive.active.pluperfect
							},
							plural: {
								first:  syn.subjunctive.active.pluperfect,
								second: syn.subjunctive.active.pluperfect,
								third:  syn.subjunctive.active.pluperfect
							}
						}
					},
					passive: {
						present: {
							singular: {
								first:  syn.subjunctive.passive.present,
								second: syn.subjunctive.passive.present,
								third:  syn.subjunctive.passive.present
							},
							plural: {
								first:  syn.subjunctive.passive.present,
								second: syn.subjunctive.passive.present,
								third: 	syn.subjunctive.passive.present
							}
						},
						imperfect: {
							singular: {
								first:  syn.subjunctive.passive.imperfect,
								second: syn.subjunctive.passive.imperfect,
								third: 	syn.subjunctive.passive.imperfect
							},
							plural: {
								first: 	syn.subjunctive.passive.imperfect,
								second: syn.subjunctive.passive.imperfect,
								third: 	syn.subjunctive.passive.imperfect
							}
						},
						perfect: {
							singular: {
								first:  syn.subjunctive.passive.perfect,
								second: syn.subjunctive.passive.perfect,
								third: 	syn.subjunctive.passive.perfect
							},
							plural: {
								first: 	syn.subjunctive.passive.perfect,
								second: syn.subjunctive.passive.perfect,
								third:  syn.subjunctive.passive.perfect
							}
						},
						pluperfect: {
							singular: {
								first:  syn.subjunctive.passive.pluperfect,
								second: syn.subjunctive.passive.pluperfect,
								third:  syn.subjunctive.passive.pluperfect
							},
							plural: {
								first:  syn.subjunctive.passive.pluperfect,
								second: syn.subjunctive.passive.pluperfect,
								third:  syn.subjunctive.passive.pluperfect
							}
						}
					}
				},
				infinitive: {
					active: {
						present: syn.infinitive.active.present,
						perfect: '-',
						future:  '-'
					},
					passive: {
						present: syn.infinitive.passive.present,
						perfect: '-',
						future:  '-'
					}
				},
				participle: {
					active: {
						present: syn.participle.active.present,
						perfect: '-',
						future:  syn.participle.active.future
					},
					passive: {
						present: '-',
						perfect: syn.participle.passive.perfect,
						future:  syn.participle.passive.future
					}
				}
			};
		break;

		case 'verb Def':
			var pr  = _(st[0].slice(0,-2));
			conjugation = {
				indicative: {
					active: {
						present: {
							singular: {
								first:  pr + _('i_'),
								second: pr + _('isti_'),
								third:  pr + 'it'
							},
							plural: {
								first:  pr + 'imus',
								second: pr + 'istis',
								third:  pr + _('e_runt') +
															' / ' + pr + _('e_re')
							}
						},
						perfect: {
							singular: {
								first:  '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first:  '-',
								second: '-',
								third:  '-'
							}
						},
						imperfect: {
							singular: {
								first:  pr + 'eram',
								second: pr + _('era_s'),
								third:  pr + 'erat'
							},
							plural: {
								first:  pr + _('era_mus'),
								second: pr + _('era_tis'),
								third:  pr + 'erant'
							}
						},
						pluperfect: {
							singular: {
								first:  '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first:  '-',
								second: '-',
								third:  '-'
							}
						},
						future: {
							singular: {
								first:  pr + _('ero_'),
								second: pr + 'eris',
								third:  pr + 'erit'
							},
							plural: {
								first:  pr + 'erimus',
								second: pr + 'eritis',
								third:  pr + 'erint'
							}
						},
						futureperfect: {
							singular: {
								first:  '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first:  '-',
								second: '-',
								third:  '-'
							}
						}
					},
					passive: {
						present: {
							singular: {
								first:  '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first:  '-',
								second: '-',
								third:  '-'
							}
						},
						perfect: {
							singular: {
								first:  '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first:  '-',
								second: '-',
								third:  '-'
							}
						},
						imperfect: {
							singular: {
								first:  '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first:  '-',
								second: '-',
								third:  '-'
							}
						},
						pluperfect: {
							singular: {
								first:  '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first:  '-',
								second: '-',
								third:  '-'
							}
						},
						future: {
							singular: {
								first:  '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first:  '-',
								second: '-',
								third:  '-'
							}
						},
						futureperfect: {
							singular: {
								first:  '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first:  '-',
								second: '-',
								third:  '-'
							}
						}
					}
				},
				subjunctive: {
					active: {
						present: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						},
						imperfect: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						},
						perfect: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						},
						pluperfect: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						}
					},
					passive: {
						present: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						},
						imperfect: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						},
						perfect: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						},
						pluperfect: {
							singular: {
								first: '-',
								second: '-',
								third: '-'
							},
							plural: {
								first: '-',
								second: '-',
								third: '-'
							}
						}
					}
				},
				imperative: {
					active: {
						present: {
							singular:{
								first:  '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first:  '-',
								second: '-',
								third:  '-'
							}
						}
					},
					passive: {
						present: {
							singular:{
								first:  '-',
								second: '-',
								third:  '-'
							},
							plural: {
								first:  '-',
								second: '-',
								third:  '-'
							}
						}
					}
				},
				infinitive: {
					active:  {
						present: _(st[1]),
						perfect: '-',
						future:  '-'
					},
					passive: {
						present: '-',
						perfect: '-',
						future:  '-'
					}
				},
				participle: {
					active: {
						present: '-',
						perfect: '-',
						future:  '-'
					},
					passive: {
						present: '-',
						perfect: '-',
						future:  '-'
					}
				}

			};
		break;

		default:
			console.log('ERROR: Unexpected verb type.');
			return null;
	}

	// edit conjugation with special syntax
	if (syn && word.type !== 'verb Irr') {
		if (syn.indicative) {
			for (var voice in syn.indicative) {
				for (var tense in syn.indicative[voice]) {
					for (var number in syn.indicative[voice][tense]) {
						for (var person in syn.indicative[voice][tense][number]) {
							if (syn.indicative[voice][tense][number][person])
								conjugation.indicative[voice][tense][number][person] = syn.indicative[voice][tense][number][person];
						}
					}
				}
			}
		}
		if (syn.imperative) {
			for (var voice in syn.imperative) {
				for (var tense in syn.imperative[voice]) {
					for (var number in syn.imperative[voice][tense]) {
						// if (syn.imperative[voice][tense][number])
							for (var person in syn.imperative[voice][tense][number])
								if (syn.imperative[voice][tense][number][person])
									conjugation.imperative[voice][tense][number][person] = syn.imperative[voice][tense][number][person];
					}
				}
			}
		}
		if (syn.infinitive) {
			for (var voice in syn.infinitive) {
				for (var tense in syn.infinitive[voice]) {
					if (syn.infinitive[voice][tense]) {
						conjugation.infinitive[voice][tense] = syn.infinitive[voice][tense];
					}
				}
			}
		}
	}

	// return conjugation
	syn = null;
	return conjugation;
};

// Decline Word
var decline = word => {

	var declension;

	// decline word
	var st = word.statement.split(', ');
	switch (word.type) {

		case 'noun indeclinable':
		case 'adjective indeclinable':
		break;

		case 'noun 1':
			var s = _(st[1].slice(0, -2));
			declension = {
				nominative: {
					singular: s + 'a',
					plural:   s + 'ae'
				},
				genitive: {
					singular: s + 'ae',
					plural:   s + _('a_rum')
				},
				dative: {
					singular: s + 'ae',
					plural:   s + _('i_s')
				},
				accusative: {
					singular: s + 'am',
					plural:   s + _('a_s')
				},
				ablative: {
					singular: s + _('a_'),
					plural:   s + _('i_s')
				},
				vocative: {
					singular: s + 'a',
					plural:   s + 'ae'
				}
			};
		break;

		case 'noun 1Pl':
			var s = _(st[1].slice(0, -5));
			declension = {
				nominative: {
					singular: '-',
					plural:   s + 'ae'
				},
				genitive: {
					singular: '-',
					plural:   s + _('a_rum')
				},
				dative: {
					singular: '-',
					plural:   s + _('i_s')
				},
				accusative: {
					singular: '-',
					plural:   s + _('a_s')
				},
				ablative: {
					singular: '-',
					plural:   s + _('i_s')
				},
				vocative: {
					singular: '-',
					plural:   s + 'ae'
				}
			};
		break;

		case 'noun 2':
			var s = _(st[1].slice(0, -2));
			declension = {
				nominative: {
					singular: st[0].slice(-2) === 'us' ? s + 'us' : _(st[0]),
					plural:   s + _('i_')
				},
				genitive: {
					singular: s + _('i_'),
					plural:   s + _('o_rum')
				},
				dative: {
					singular: s + _('o_'),
					plural:   s + _('i_s')
				},
				accusative: {
					singular: s + 'um',
					plural:   s + _('o_s')
				},
				ablative: {
					singular: s + _('o_'),
					plural:   s + _('i_s')
				},
				vocative: {
					singular: st[0].slice(-2) === 'us' ? s + 'e' : _(st[0]),
					plural:   s + _('i_')
				}
			};
		break;

		case 'noun 2Pl':
			var s = _(st[1].slice(0, -5));
			declension = {
				nominative: {
					singular: '-',
					plural:   s + 'i_'
				},
				genitive: {
					singular: '-',
					plural:   s + _('o_rum')
				},
				dative: {
					singular: '-',
					plural:   s + _('i_s')
				},
				accusative: {
					singular: '-',
					plural:   s + _('o_s')
				},
				ablative: {
					singular: '-',
					plural:   s + _('i_s')
				},
				vocative: {
					singular: '-',
					plural:   s + _('i_')
				}
			};
		break;

		case 'noun 2n':
			var s = _(st[1].slice(0, -2));
			declension = {
				nominative: {
					singular: s + 'um',
					plural:   s + 'a'
				},
				genitive: {
					singular: s + _('i_'),
					plural:   s + _('o_rum')
				},
				dative: {
					singular: s + _('o_'),
					plural:   s + _('i_s')
				},
				accusative: {
					singular: s + 'um',
					plural:   s + 'a'
				},
				ablative: {
					singular: s + _('o_'),
					plural:   s + _('i_s')
				},
				vocative: {
					singular: s + 'um',
					plural:   s + 'a'
				}
			};
		break;

		case 'noun 2nPl':
			var s = _(st[1].slice(0, -5));
			declension = {
				nominative: {
					singular: '-',
					plural:   s + 'a'
				},
				genitive: {
					singular: '-',
					plural:   s + _('o_rum')
				},
				dative: {
					singular: '-',
					plural:   s + _('i_s')
				},
				accusative: {
					singular: '-',
					plural:   s + 'a'
				},
				ablative: {
					singular: '-',
					plural:   s + _('i_s')
				},
				vocative: {
					singular: '-',
					plural:   s + 'a'
				}
			};
		break;

		case 'noun 3':
			var s = _(st[1].slice(0, -2));
			declension = {
				nominative: {
					singular: _(st[0]),
					plural:   s + _('e_s')
				},
				genitive: {
					singular: s + 'is',
					plural:   s + 'um'
				},
				dative: {
					singular: s + _('i_'),
					plural:   s + 'ibus'
				},
				accusative: {
					singular: s + 'em',
					plural:   s + _('e_s')
				},
				ablative: {
					singular: s + 'e',
					plural:   s + 'ibus'
				},
				vocative: {
					singular: _(st[0]),
					plural:   s + _('e_s')
				}
			};
		break;

		case 'noun 3Pl':
			var s = _(st[1].slice(0, -2));
			declension = {
				nominative: {
					singular: '-',
					plural:   s + _('e_s')
				},
				genitive: {
					singular: '-',
					plural:   s + 'um'
				},
				dative: {
					singular: '-',
					plural:   s + 'ibus'
				},
				accusative: {
					singular: '-',
					plural:   s + _('e_s')
				},
				ablative: {
					singular: '-',
					plural:   s + 'ibus'
				},
				vocative: {
					singular: '-',
					plural:   s + _('e_s')
				}
			};
		break;

		case 'noun 3n':
			var s = _(st[1].slice(0, -2));
			declension = {
				nominative: {
					singular: _(st[0]),
					plural:   s + 'a'
				},
				genitive: {
					singular: s + 'is',
					plural:   s + 'um'
				},
				dative: {
					singular: s + _('i_'),
					plural:   s + 'ibus'
				},
				accusative: {
					singular: _(st[0]),
					plural:   s + 'a'
				},
				ablative: {
					singular: s + 'e',
					plural:   s + 'ibus'
				},
				vocative: {
					singular: _(st[0]),
					plural:   s + 'a'
				}
			};
		break;

		case 'noun 3i':
			var s = _(st[1].slice(0, -2));
			declension = {
				nominative: {
					singular: _(st[0]),
					plural:   s + _('e_s')
				},
				genitive: {
					singular: s + 'is',
					plural:   s + 'ium'
				},
				dative: {
					singular: s + _('i_'),
					plural:   s + 'ibus'
				},
				accusative: {
					singular: s + 'em',
					plural:   s + _('e_s') + ' / ' + s + _('i_s'),
				},
				ablative: {
					singular: s + 'e',
					plural:   s + 'ibus'
				},
				vocative: {
					singular: _(st[0]),
					plural:   s + _('e_s')
				}
			};
		break;

		case 'noun 3in':
			var s = _(st[1].slice(0, -2));
			declension = {
				nominative: {
					singular: _(st[0]),
					plural:   s + 'ia'
				},
				genitive: {
					singular: s + 'is',
					plural:   s + 'ium'
				},
				dative: {
					singular: s + _('i_'),
					plural:   s + 'ibus'
				},
				accusative: {
					singular: _(st[0]),
					plural:   s + 'ia'
				},
				ablative: {
					singular: s + _('i_'),
					plural:   s + 'ibus'
				},
				vocative: {
					singular: _(st[0]),
					plural:   s + 'ia'
				}
			};
		break;

		case 'noun 3nPl':
			var s = _(st[1].slice(0, -2));
			declension = {
				nominative: {
					singular: '-',
					plural:   s + 'a'
				},
				genitive: {
					singular: '-',
					plural:   s + 'um'
				},
				dative: {
					singular: '-',
					plural:   s + 'ibus'
				},
				accusative: {
					singular: '-',
					plural:   s + 'a'
				},
				ablative: {
					singular: '-',
					plural:   s + 'ibus'
				},
				vocative: {
					singular: '-',
					plural:   s + 'a'
				}
			};
		break;

		case 'noun 3inPl':
			var s = _(st[1].slice(0, -3));
			declension = {
				nominative: {
					singular: '-',
					plural:   s + 'ia'
				},
				genitive: {
					singular: '-',
					plural:   s + 'ium'
				},
				dative: {
					singular: '-',
					plural:   s + 'ibus'
				},
				accusative: {
					singular: '-',
					plural:   s + 'ia'
				},
				ablative: {
					singular: '-',
					plural:   s + 'ibus'
				},
				vocative: {
					singular: '-',
					plural:   s + 'ia'
				}
			};
		break;

		case 'noun 4':
			var s = _(st[1].slice(0, -3));
			declension = {
				nominative: {
					singular: s + 'us',
					plural:   s + _('u_s')
				},
				genitive: {
					singular: s + _('u_s'),
					plural:   s + 'uum'
				},
				dative: {
					singular: s + _('ui_') + ' / ' + s + _('u_'),
					plural:   s + 'ibus'
				},
				accusative: {
					singular: s + 'um',
					plural:   s + _('u_s')
				},
				ablative: {
					singular: s + _('u_'),
					plural:   s + 'ibus'
				},
				vocative: {
					singular: s + 'us',
					plural:   s + _('u_s')
				}
			};
		break;

		case 'noun 5':
			var s = st[1][st[1].length - 3] === '_'  ?
							_(st[1].slice(0, st[1].length - 4)) :
							_(st[1].slice(0, st[1].length - 3)) ;
			declension = {
				nominative: {
					singular: s + _('e_s'),
					plural:   s + _('e_s')
				},
				genitive: {
					singular: s === _(st[1].slice(0, st[1].length - 4)) ? s + _('e_i_') : s + _('ei_'),
					plural:   s + _('e_rum')
				},
				dative: {
					singular: s === _(st[1].slice(0, st[1].length - 4)) ? s + _('e_i_') : s + _('ei_'),
					plural:   s + _('e_bus')
				},
				accusative: {
					singular: s + 'em',
					plural:   s + _('e_s')
				},
				ablative: {
					singular: s + _('e_'),
					plural:   s + _('e_bus')
				},
				vocative: {
					singular: s + _('e_s'),
					plural:   s + _('e_s')
				}
			};
		break;

		case 'pronoun personal':
			if (st[0] === 'ego_') {
				declension = {
					nominative: {
						singular: _('ego_'),
						plural:   _('no_s')
					},
					genitive: {
						singular: _('mei_') ,
						plural:   _('nostrum / nostri_')
					},
					dative: {
						singular: 'mihi',
						plural:   _('no_bi_s')
					},
					accusative: {
						singular: _('me_'),
						plural:   _('no_s')
					},
					ablative: {
						singular: _('me_'),
						plural:   _('no_bi_s')
					},
					vocative: {
						singular: '-',
						plural:   '-'
					}
				};
			} else if (st[0] === 'tu_') {
				declension = {
					nominative: {
						singular: _('tu_'),
						plural:   _('vo_s')
					},
					genitive: {
						singular: _('tui_'),
						plural:   _('vestrum / vestri_')
					},
					dative: {
						singular: 'tibi',
						plural:   _('vo_bi_s')
					},
					accusative: {
						singular: _('te_'),
						plural:   _('vo_s')
					},
					ablative: {
						singular: _('te_'),
						plural:   _('vo_bi_s')
					},
					vocative: {
						singular: '-',
						plural:   '-'
					}
				};
			} else if (st[0] === 'is') {
				declension = {
					nominative: {
						singular: 'is',
						plural:   _('ei_ / ii_')
					},
					genitive: {
						singular: 'eius',
						plural:   _('eo_rum')
					},
					dative: {
						singular: _('ei_'),
						plural:  _('ei_s / ii_s')
					},
					accusative: {
						singular: 'eum',
						plural:   _('eo_s')
					},
					ablative: {
						singular: _('eo_'),
						plural:   _('ei_s / ii_s')
					},
					vocative: {
						singular: '-',
						plural:   '-'
					}
				};
			} else if (st[0] === 'ea') {
				declension = {
					nominative: {
						singular: 'ea',
						plural:   'eae'
					},
					genitive: {
						singular: 'eius',
						plural:   _('ea_rum')
					},
					dative: {
						singular: _('ei_'),
						plural:  _('ei_s / ii_s')
					},
					accusative: {
						singular: 'eam',
						plural:   _('ea_s')
					},
					ablative: {
						singular: _('ea_'),
						plural:   _('ei_s / ii_s')
					},
					vocative: {
						singular: '-',
						plural:   '-'
					}
				};
			} else if (st[0] === 'id') {
				declension = {
					nominative: {
						singular: 'id',
						plural:   'ea'
					},
					genitive: {
						singular: 'eius',
						plural:   _('eo_rum')
					},
					dative: {
						singular: _('ei_'),
						plural:  _('ei_s / ii_s')
					},
					accusative: {
						singular: 'id',
						plural:   'ea'
					},
					ablative: {
						singular: _('eo_'),
						plural:   _('ei_s / ii_s')
					},
					vocative: {
						singular: '-',
						plural:   '-'
					}
				};
			}
		break;

		case 'pronoun reflexive':
			console.log(st);
			if (st[1] === 'mei_; -') {
				declension = {
					nominative: {
						singular: '-',
						plural:   '-'
					},
					genitive: {
						singular: _('mei_') ,
						plural:   _('nostrum / nostri_')
					},
					dative: {
						singular: 'mihi',
						plural:   _('no_bi_s')
					},
					accusative: {
						singular: _('me_'),
						plural:   _('no_s')
					},
					ablative: {
						singular: _('me_'),
						plural:   _('no_bi_s')
					},
					vocative: {
						singular: '-',
						plural:   '-'
					}
				};
			} else if (st[1] === 'tui_; -') {
				declension = {
					nominative: {
						singular: '-',
						plural:   '-'
					},
					genitive: {
						singular: _('tui_'),
						plural:   _('vestrum / vestri_')
					},
					dative: {
						singular: 'tibi',
						plural:   _('vo_bi_s')
					},
					accusative: {
						singular: _('te_'),
						plural:   _('vo_s')
					},
					ablative: {
						singular: _('te_'),
						plural:   _('vo_bi_s')
					},
					vocative: {
						singular: '-',
						plural:   '-'
					}
				};
			} else if (st[1] === 'sui_') {
				declension = {
					nominative: {
						singular: '-',
						plural:   '-'
					},
					genitive: {
						singular: _('sui_'),
						plural:   _('sui_')
					},
					dative: {
						singular: 'sibi',
						plural:   'sibi'
					},
					accusative: {
						singular: _('se_, se_se_'),
						plural:   _('se_, se_se_')
					},
					ablative: {
						singular: _('se_, se_se_'),
						plural:   _('se_, se_se_')
					},
					vocative: {
						singular: '-',
						plural:   '-'
					}
				};
			}
		break;

		case 'adjective 1,2':
			var s = _(st[1].slice(0,-1));
			declension = {
				nominative: {
					singular: {
						masculine: st[0].slice(-2) === 'us' ? s + 'us' : _(st[0]),
						feminine:  s + 'a',
						neuter:    s + 'um'
					},
					plural:   {
						masculine: s + _('i_'),
						feminine:  s + 'ae',
						neuter:    s + 'a'
					}
				},
				genitive: {
					singular: {
						masculine: s + _('i_'),
						feminine:  s + 'ae',
						neuter:    s + _('i_')
					},
					plural:   {
						masculine: s + _('o_rum'),
						feminine:  s + _('a_rum'),
						neuter:    s + _('o_rum')
					}
				},
				dative: {
					singular: {
						masculine: s + _('o_'),
						feminine:  s + 'ae',
						neuter:    s + _('o_')
					},
					plural:   {
						masculine: s + _('i_s'),
						feminine:  s + _('i_s'),
						neuter:    s + _('i_s')
					}
				},
				accusative: {
					singular: {
						masculine: s + 'um',
						feminine:  s + 'am',
						neuter:    s + 'um'
					},
					plural:   {
						masculine: s + _('o_s'),
						feminine:  s + _('a_s'),
						neuter:    s + 'a',
					}
				},
				ablative: {
					singular: {
						masculine: s + _('o_'),
						feminine:  s + _('a_'),
						neuter:    s + _('o_')
					},
					plural:   {
						masculine: s + _('i_s'),
						feminine:  s + _('i_s'),
						neuter:    s + _('i_s')
					}
				},
				vocative: {
					singular: {
						masculine: st[0].slice(-2) === 'us' ? s + 'e' : _(st[0]),
						feminine:  s + 'a',
						neuter:    s + 'um'
					},
					plural:   {
						masculine: s + _('i_'),
						feminine:  s + 'ae',
						neuter:    s + _('i_')
					}
				},
				adverb: s + _('e_')
			};
		break;

		case 'adjective 1,2pl':
			var s = _(st[1].slice(0,-2));
			declension = {
				nominative: {
					singular: {
						masculine: '-',
						feminine:  '-',
						neuter:    '-'
					},
					plural:   {
						masculine: s + _('i_'),
						feminine:  s + 'ae',
						neuter:    s + 'a'
					}
				},
				genitive: {
					singular: {
						masculine: '-',
						feminine:  '-',
						neuter:    '-'
					},
					plural:   {
						masculine: s + _('o_rum'),
						feminine:  s + _('a_rum'),
						neuter:    s + _('o_rum')
					}
				},
				dative: {
					singular: {
						masculine: '-',
						feminine:  '-',
						neuter:    '-'
					},
					plural:   {
						masculine: s + _('i_s'),
						feminine:  s + _('i_s'),
						neuter:    s + _('i_s')
					}
				},
				accusative: {
					singular: {
						masculine: '-',
						feminine:  '-',
						neuter:    '-'
					},
					plural:   {
						masculine: s + _('o_s'),
						feminine:  s + _('a_s'),
						neuter:    s + 'a',
					}
				},
				ablative: {
					singular: {
						masculine: '-',
						feminine:  '-',
						neuter:    '-'
					},
					plural:   {
						masculine: s + _('i_s'),
						feminine:  s + _('i_s'),
						neuter:    s + _('i_s')
					}
				},
				vocative: {
					singular: {
						masculine: '-',
						feminine:  '-',
						neuter:    '-'
					},
					plural:   {
						masculine: s + _('i_'),
						feminine:  s + 'ae',
						neuter:    s + _('i_')
					}
				},
				adverb: s + _('e_')
			};
		break;

		case 'adjective 3':
			var numSingNoms = st[2] != null  ? 3 :
				st[1][st[1].length - 1] == 'e' ? 2 : 1;
			var s = _(st[numSingNoms == 2 ? 0 : 1].slice(0,-2));
			declension = {
				nominative: {
					singular: {
						masculine: _(st[0]),
						feminine:  _(st[numSingNoms == 3 ? 1 : 0]),
						neuter:    _(st[numSingNoms == 3 ? 2 : numSingNoms == 2 ? 1 : 0])
					},
					plural:   {
						masculine: s + _('e_s'),
						feminine:  s + _('e_s'),
						neuter:    s + 'ia'
					}
				},
				genitive: {
					singular: {
						masculine: s + 'is',
						feminine:  s + 'is',
						neuter:    s + 'is'
					},
					plural:   {
						masculine: s + 'ium',
						feminine:  s + 'ium',
						neuter:    s + 'ium'
					}
				},
				dative: {
					singular: {
						masculine: s + _('i_'),
						feminine:  s + _('i_'),
						neuter:    s + _('i_')
					},
					plural:   {
						masculine: s + 'ibus',
						feminine:  s + 'ibus',
						neuter:    s + 'ibus'
					}
				},
				accusative: {
					singular: {
						masculine: s + 'em',
						feminine:  s + 'em',
						neuter:    _(st[numSingNoms == 3 ? 2 : numSingNoms == 2 ? 1 : 0])
					},
					plural:   {
						masculine: s + _('e_s') + ' / ' + s + _('i_s'),
						feminine:  s + _('e_s') + ' / ' + s + _('i_s'),
						neuter:    s + 'ia',
					}
				},
				ablative: {
					singular: {
						masculine: s + _('i_'),
						feminine:  s + _('i_'),
						neuter:    s + _('i_')
					},
					plural:   {
						masculine: s + 'ibus',
						feminine:  s + 'ibus',
						neuter:    s + 'ibus'
					}
				},
				vocative: {
					singular: {
						masculine: _(st[0]),
						feminine:  _(st[numSingNoms == 3 ? 1 : 0]),
						neuter:    _(st[numSingNoms == 3 ? 2 : numSingNoms == 2 ? 1 : 0])
					},
					plural:   {
						masculine: s + _('e_s'),
						feminine:  s + _('e_s'),
						neuter:    s + 'ia'
					}
				},
				adverb: s + 'iter'
			};
		break;

		case 'adjective pronominal':
			var s = _(st[1].slice(0,-1));
			declension = {
				nominative: {
					singular: {
						masculine: _(st[0]),
						feminine:  s + 'a',
						neuter:    s + 'um'
					},
					plural:   {
						masculine: s + _('i_'),
						feminine:  s + 'ae',
						neuter:    s + 'a'
					}
				},
				genitive: {
					singular: {
						masculine: s + _('i_us'),
						feminine:  s + _('i_us'),
						neuter:    s + _('i_us')
					},
					plural:   {
						masculine: s + _('o_rum'),
						feminine:  s + _('a_rum'),
						neuter:    s + _('o_rum')
					}
				},
				dative: {
					singular: {
						masculine: s + _('i_'),
						feminine:  s + _('i_'),
						neuter:    s + _('i_')
					},
					plural:   {
						masculine: s + _('i_s'),
						feminine:  s + _('i_s'),
						neuter:    s + _('i_s')
					}
				},
				accusative: {
					singular: {
						masculine: s + 'um',
						feminine:  s + 'am',
						neuter:    s + 'um'
					},
					plural:   {
						masculine: s + _('o_s'),
						feminine:  s + _('a_s'),
						neuter:    s + 'a',
					}
				},
				ablative: {
					singular: {
						masculine: s + _('o_'),
						feminine:  s + _('a_'),
						neuter:    s + _('o_')
					},
					plural:   {
						masculine: s + _('i_s'),
						feminine:  s + _('i_s'),
						neuter:    s + _('i_s')
					}
				},
				vocative: {
					singular: {
						masculine: st[0].slice(-2) === 'us' ? s + 'e' : _(st[0]),
						feminine:  s + 'a',
						neuter:    s + 'um'
					},
					plural:   {
						masculine: s + _('i_'),
						feminine:  s + 'ae',
						neuter:    s + _('i_')
					}
				}
			};
		break;

		case 'adjective demonstrative':
		case 'pronoun demonstrative':
			var s = st[0] === 'hic' ? 0 : st[0] === 'iste' ? 1 : st[1] === 'ille' ? 2 : 2;
			declension = {
				nominative: {
					singular: {
						masculine: s == 0 ? 'hic'  : s == 1 ? 'iste'  : 'ille',
						feminine:  s == 0 ? 'haec' : s == 1 ? 'ista'  : 'illa',
						neuter:    s == 0 ? 'hoc'  : s == 1 ? 'istud' : 'illud'
					},
					plural:   {
						masculine: s == 0 ? _('hi_') : s == 1 ? _('isti_') : _('illi_'),
						feminine:  s == 0 ? 'hae'    : s == 1 ? 'istae'    : 'illae',
						neuter:    s == 0 ? 'haec'   : s == 1 ? 'ista'     : 'illa'
					}
				},
				genitive: {
					singular: {
						masculine: s == 0 ? 'huius' : s == 1 ? _('isti_us') : _('illi_us'),
						feminine:  s == 0 ? 'huius' : s == 1 ? _('isti_us') : _('illi_us'),
						neuter:    s == 0 ? 'huius' : s == 1 ? _('isti_us') : _('illi_us')
					},
					plural:   {
						masculine: s == 0 ? _('ho_rum') : s == 1 ? _('isto_rum') : _('illo_rum'),
						feminine:  s == 0 ? _('ha_rum') : s == 1 ? _('ista_rum') : _('illa_rum'),
						neuter:    s == 0 ? _('ho_rum') : s == 1 ? _('isto_rum') : _('illo_rum')
					}
				},
				dative: {
					singular: {
						masculine: s == 0 ? 'huic' : s == 1 ? _('isti_') : _('illi_'),
						feminine:  s == 0 ? 'huic' : s == 1 ? _('isti_') : _('illi_'),
						neuter:    s == 0 ? 'huic' : s == 1 ? _('isti_') : _('illi_')
					},
					plural:   {
						masculine: s == 0 ? _('hi_s') : s == 1 ? _('isti_s') : _('illi_s'),
						feminine:  s == 0 ? _('hi_s') : s == 1 ? _('isti_s') : _('illi_s'),
						neuter:    s == 0 ? _('hi_s') : s == 1 ? _('isti_s') : _('illi_s')
					}
				},
				accusative: {
					singular:   {
						masculine: s == 0 ? 'hunc' : s == 1 ? 'istum' : 'illum',
						feminine:  s == 0 ? 'hanc' : s == 1 ? 'istam' : 'illam',
						neuter:    s == 0 ? 'hoc'  : s == 1 ? 'istud' : 'illud'
					},
					plural: {
						masculine: s == 0 ? _('ho_s') : s == 1 ? _('isto_s') : _('illo_s'),
						feminine:  s == 0 ? _('ha_s') : s == 1 ? _('ista_s') : _('illa_s'),
						neuter:    s == 0 ? 'haec'  : s == 1 ? 'ista'      : 'illa'
					},
				},
				ablative: {
					singular: {
						masculine: s == 0 ? _('ho_c') : s == 1 ? _('isto_') : _('illo_'),
						feminine:  s == 0 ? _('ha_c') : s == 1 ? _('ista_') : _('illa_'),
						neuter:    s == 0 ? _('ho_c') : s == 1 ? _('isto_') : _('illo_')
					},
					plural:   {
						masculine: s == 0 ? _('hi_s') : s == 1 ? _('isti_s') : _('illi_s'),
						feminine:  s == 0 ? _('hi_s') : s == 1 ? _('isti_s') : _('illi_s'),
						neuter:    s == 0 ? _('hi_s') : s == 1 ? _('isti_s') : _('illi_s')
					}
				},
				vocative: {
					singular: {
						masculine: '-',
						feminine:  '-',
						neuter:    '-'
					},
					plural:   {
						masculine: '-',
						feminine:  '-',
						neuter:    '-'
					}
				}
			};
		break;

		case 'pronoun relative':
		case 'adjective interrogative':
			declension = {
				nominative: {
					singular: {
						masculine: _('qui_'),
						feminine:  'quae',
						neuter:    'quod'
					},
					plural:   {
						masculine: _('qui_'),
						feminine:  'quae',
						neuter:    'quae'
					}
				},
				genitive: {
					singular: {
						masculine: 'cuius',
						feminine:  'cuius',
						neuter:    'cuius'
					},
					plural:   {
						masculine: _('quo_rum'),
						feminine:  _('qua_rum'),
						neuter:    _('quo_rum')
					}
				},
				dative: {
					singular: {
						masculine: 'cui',
						feminine:  'cui',
						neuter:    'cui'
					},
					plural:   {
						masculine: 'quibus',
						feminine:  'quibus',
						neuter:    'quibus'
					}
				},
				accusative: {
					singular:   {
						masculine: 'quem',
						feminine:  'quam',
						neuter:    'quod'
					},
					plural: {
						masculine: _('quo_s'),
						feminine:  _('qua_s'),
						neuter:    'quae'
					},
				},
				ablative: {
					singular: {
						masculine: _('quo_'),
						feminine:  _('qua_'),
						neuter:    _('quo_')
					},
					plural:   {
						masculine: 'quibus',
						feminine:  'quibus',
						neuter:    'quibus'
					}
				},
				vocative: {
					singular: {
						masculine: '-',
						feminine:  '-',
						neuter:    '-'
					},
					plural:   {
						masculine: '-',
						feminine:  '-',
						neuter:    '-'
					}
				}
			};
		break;

		case 'pronoun interrogative':
			declension = {
				nominative: {
					singular: {
						masculine: 'quis',
						feminine:  'quis',
						neuter:    'quid'
					},
					plural:   {
						masculine: _('qui_'),
						feminine:  'quae',
						neuter:    'quae'
					}
				},
				genitive: {
					singular: {
						masculine: 'cuius',
						feminine:  'cuius',
						neuter:    'cuius'
					},
					plural:   {
						masculine: _('quo_rum'),
						feminine:  _('qua_rum'),
						neuter:    _('quo_rum')
					}
				},
				dative: {
					singular: {
						masculine: 'cui',
						feminine:  'cui',
						neuter:    'cui'
					},
					plural:   {
						masculine: 'quibus',
						feminine:  'quibus',
						neuter:    'quibus'
					}
				},
				accusative: {
					singular:   {
						masculine: 'quem',
						feminine:  'quem',
						neuter:    'quid'
					},
					plural: {
						masculine: _('quo_s'),
						feminine:  _('qua_s'),
						neuter:    'quae'
					},
				},
				ablative: {
					singular: {
						masculine: _('quo_'),
						feminine:  _('quo_'),
						neuter:    _('quo_')
					},
					plural:   {
						masculine: 'quibus',
						feminine:  'quibus',
						neuter:    'quibus'
					}
				},
				vocative: {
					singular: {
						masculine: '-',
						feminine:  '-',
						neuter:    '-'
					},
					plural:   {
						masculine: '-',
						feminine:  '-',
						neuter:    '-'
					}
				}
			};
		break;

		case 'pronoun indefinite':
			declension = {
				nominative: {
					singular: {
						masculine: _('qui_dam'),
						feminine:  'quaedam',
						neuter:    'quiddam'
					},
					plural:   {
						masculine: _('qui_dam'),
						feminine:  'quaedam',
						neuter:    'quaedam'
					}
				},
				genitive: {
					singular: {
						masculine: 'cuiusdam',
						feminine:  'cuiusdam',
						neuter:    'cuiusdam'
					},
					plural:   {
						masculine: _('quo_rundam'),
						feminine:  _('qua_rundam'),
						neuter:    _('quo_rundam')
					}
				},
				dative: {
					singular: {
						masculine: 'cuidam',
						feminine:  'cuidam',
						neuter:    'cuidam'
					},
					plural:   {
						masculine: 'quibusdam',
						feminine:  'quibusdam',
						neuter:    'quibusdam'
					}
				},
				accusative: {
					singular:   {
						masculine: 'quendam',
						feminine:  'quandam',
						neuter:    'quiddam'
					},
					plural: {
						masculine: _('quo_sdam'),
						feminine:  _('qua_sdam'),
						neuter:    'quaedam'
					},
				},
				ablative: {
					singular: {
						masculine: _('quo_dam'),
						feminine:  _('qua_dam'),
						neuter:    _('quo_dam')
					},
					plural:   {
						masculine: 'quibusdam',
						feminine:  'quibusdam',
						neuter:    'quibusdam'
					}
				},
				vocative: {
					singular: {
						masculine: '-',
						feminine:  '-',
						neuter:    '-'
					},
					plural:   {
						masculine: '-',
						feminine:  '-',
						neuter:    '-'
					}
				}
			};
		break;

		case 'adjective indefinite':
			declension = {
				nominative: {
					singular: {
						masculine: _('qui_dam'),
						feminine:  'quaedam',
						neuter:    'quoddam'
					},
					plural:   {
						masculine: _('qui_dam'),
						feminine:  'quaedam',
						neuter:    'quaedam'
					}
				},
				genitive: {
					singular: {
						masculine: 'cuiusdam',
						feminine:  'cuiusdam',
						neuter:    'cuiusdam'
					},
					plural:   {
						masculine: _('quo_rundam'),
						feminine:  _('qua_rundam'),
						neuter:    _('quo_rundam')
					}
				},
				dative: {
					singular: {
						masculine: 'cuidam',
						feminine:  'cuidam',
						neuter:    'cuidam'
					},
					plural:   {
						masculine: 'quibusdam',
						feminine:  'quibusdam',
						neuter:    'quibusdam'
					}
				},
				accusative: {
					singular:   {
						masculine: 'quendam',
						feminine:  'quandam',
						neuter:    'quoddam'
					},
					plural: {
						masculine: _('quo_sdam'),
						feminine:  _('qua_sdam'),
						neuter:    'quaedam'
					},
				},
				ablative: {
					singular: {
						masculine: _('quo_dam'),
						feminine:  _('qua_dam'),
						neuter:    _('quo_dam')
					},
					plural:   {
						masculine: 'quibusdam',
						feminine:  'quibusdam',
						neuter:    'quibusdam'
					}
				},
				vocative: {
					singular: {
						masculine: '-',
						feminine:  '-',
						neuter:    '-'
					},
					plural:   {
						masculine: '-',
						feminine:  '-',
						neuter:    '-'
					}
				}
			};
		break;

		case 'adjective idem':
			declension = {
				nominative: {
					singular: {
						masculine: _('i_dem'),
						feminine:  'eadem',
						neuter:    'idem'
					},
					plural:   {
						masculine: _('i_dem / ei_dem'),
						feminine:  'eaedem',
						neuter:    'eadem'
					}
				},
				genitive: {
					singular: {
						masculine: 'eiusdem',
						feminine:  'eiusdem',
						neuter:    'eiusdem'
					},
					plural:   {
						masculine: _('eo_rundem'),
						feminine:  _('ea_rundem'),
						neuter:    _('eo_rundem')
					}
				},
				dative: {
					singular: {
						masculine: _('ei_dem'),
						feminine:  _('ei_dem'),
						neuter:    _('ei_dem')
					},
					plural:   {
						masculine: _('i_sdem / ei_sdem'),
						feminine:  _('i_sdem / ei_sdem'),
						neuter:    _('i_sdem / ei_sdem')
					}
				},
				accusative: {
					singular:   {
						masculine: 'eundem',
						feminine:  'eandem',
						neuter:    'idem'
					},
					plural: {
						masculine: _('eo_sdem'),
						feminine:  _('ea_sdem'),
						neuter:    'eadem'
					},
				},
				ablative: {
					singular: {
						masculine: _('eo_dem'),
						feminine:  _('ea_dem'),
						neuter:    _('eo_dem')
					},
					plural:   {
						masculine: _('i_sdem / ei_sdem'),
						feminine:  _('i_sdem / ei_sdem'),
						neuter:    _('i_sdem / ei_sdem')
					}
				},
				vocative: {
					singular: {
						masculine: '-',
						feminine:  '-',
						neuter:    '-'
					},
					plural:   {
						masculine: '-',
						feminine:  '-',
						neuter:    '-'
					}
				}
			};
		break;

		default:
			console.log('ERROR: Unexpected noun type.')
			return null;
	}

	// edit declension with specialSyntax
	if (word.specialSyntax) {
		for (var case_ in word.specialSyntax) {
			if (case_ == 'adverb') {
				declension.adverb = word.specialSyntax.adverb;
				continue;
			}
			for (var number in word.specialSyntax[case_]) {
				// if noun
				if ((word.type.slice(0,4) === 'noun' ||
						word.type === 'pronoun personal' ||
						word.type === 'pronoun reflexive') &&
						word.specialSyntax[case_][number])
					declension[case_][number] = word.specialSyntax[case_][number];
				// if adjective
				else if (word.type.slice(0,9) === 'adjective') {
					for (var gender in word.specialSyntax[case_][number]) {
						if (word.specialSyntax[case_][number][gender])
							declension[case_][number][gender] = word.specialSyntax[case_][number][gender];
					}
				}
			}
		}
	}

	// return declension
	return declension;
};

// Vocabulary
	var V = {

		nouns: {

		// LTRL Ch.1
			agricola: new Word({
				statement:  'agricola, agricolae, m.',
				definition: 'farmer',
				notes: null,
				type: 'noun 1',
				specialSyntax: null
			}),
			anima: new Word({
				statement: 'anima, animae, f.',
				definition: 'breath; life force; soul',
				notes: '<p>' +
							 '<b>physical meaning</b>: \'breath\' of a human being. <br><b>by extension</b>: \'breath\' of life, \'life force\'.'
							 +'<br>Means \'soul\' in the sense of what gives an animate being life.'
							 +'</p>', // *
				type: 'noun 1',
				specialSyntax: null
			}),
			dea: new Word({
				statement: 'dea, deae, f.',
				definition: 'goddess',
				notes: _('<p>special dative and ablative plural forms: <b>dea_bus</b></p>'), // *
				type: 'noun 1',
				specialSyntax: {
					dative: {
						plural: _('dea_bus')
					},
					ablative: {
						plural: _('dea_bus')
					}
				}
			}),
			fama: new Word({
				statement: 'fa_ma, fa_mae, f.',
				definition: 'report, rumor; reputation, fame',
				notes: '<p>'
							 +'From Indo-European word for \'speak\'. Indicates what is spoken publicly or by the people. Basic meaning is \'talk\' (something spoken) or \'rumor\'.'
							 +_('<br> A <b>fa_ma</b> often told becomes a \'story\'. A person\'s <b>fa_ma</b> is his or her \'reputation\' or \'fame\'.')
							 + 'When capitalized, means the goddess \'Rumor\'.'
							 +'</p>',
				type: 'noun 1',
				specialSyntax: null
			}),
			femina: new Word({
				statement: 'fe_mina, fe_minae, f.',
				definition: 'woman; wife',
				notes: null,
				type: 'noun 1',
				specialSyntax: null
			}),
			filia : new Word({
				statement: 'fi_lia, fi_liae, f.',
				definition: 'daughter',
				notes: _('<p>special dative and ablative plural forms: <b>fi_lia_bus</b></p>'), //*
				type: 'noun 1',
				specialSyntax: {
					dative: {
						plural: _('fi_lia_bus')
					},
					ablative: {
						plural: _('fi_lia_bus')
					}
				}
			}),
			insula: new Word({
				statement: 'i_nsula, i_nsulae, f.',
				definition: 'island',
				notes: null,
				type: 'noun 1',
				specialSyntax: null
			}),
			Italia: new Word({
				statement: 'Italia, Italiae, f.',
				definition: 'Italy',
				notes: null,
				type: 'noun 1',
				specialSyntax: null
			}),
			nauta: new Word({
				statement: 'nauta, nautae, m',
				definition: 'sailor',
				notes: null,
				type: 'noun 1',
				specialSyntax: null
			}),
			patria: new Word({
				statement: 'patria, patriae, f.',
				definition: 'country, homeland',
				notes: null,
				type: 'noun 1',
				specialSyntax: null
			}),
			pecunia: new Word({
				statement: 'pecu_nia, pecu_niae, f.',
				definition: 'money',
				notes: null,
				type: 'noun 1',
				specialSyntax: null
			}),
			poeta: new Word({
				statement: 'poe_ta, poe_tae, m.',
				definition: 'poet',
				notes: '', // *
				type: 'noun 1',
				specialSyntax: null
			}),
			puella: new Word({
				statement: 'puella, puellae, f.',
				definition: 'girl',
				notes: null,
				type: 'noun 1',
				specialSyntax: null
			}),
			regina: new Word({
				statement: 're_gi_na, re_gi_nae, f.',
				definition: 'queen',
				notes: null,
				type: 'noun 1',
				specialSyntax: null
			}),
			via: new Word({
				statement: 'via, viae, f.',
				definition: 'way, road, street, path',
				notes: null,
				type: 'noun 1',
				specialSyntax: null
			}),
			ager: new Word({
				statement: 'ager, agri_, m',
				definition: 'field',
				notes: null,
				type: 'noun 2',
				specialSyntax: null
			}),
			deus: new Word({
				statement: 'deus, dei_, m.',
				definition: 'god',
				notes: 'common irregular forms in the plural', // *
				type: 'noun 2',
				specialSyntax: {
					nominative: {
						plural: _('di_ / dei_')
					},
					genitive: {
						plural: _('deum / deo_rum')
					},
					dative: {
						plural: _('di_s')
					},
					ablative: {
						plural: _('di_s')
					},
					vocative: {
						singular: 'deus',
						plural: _('di_ / dei_')
					}
				}
			}),
			dominus: new Word({
				statement: 'dominus, domini_, m.',
				definition: 'master, lord',
				notes: '<p>Cognate with <b>domus</b>. Original meaning was \'master of the house\'.</p>', // *
				type: 'noun 2',
				specialSyntax: null
			}),
			filius: new Word({
				statement: 'fi_lius, fi_lii_, m.',
				definition: 'son',
				notes: _('<p>Irregular vocative singular form <b>fi_li_</b>.<p>'), // *
				type: 'noun 2',
				specialSyntax: {
					vocative: {
						singular: _('fi_li_')
					}
				} // *
			}),
			gladius: new Word({
				statement: 'gladius, gladii_, m.',
				definition: 'sword',
				notes: null,
				type: 'noun 2',
				specialSyntax: null
			}),
			liber: new Word({
				statement: 'liber, libri_, m.',
				definition: 'book',
				notes: null,
				type: 'noun 2',
				specialSyntax: null
			}),
			puer: new Word({
				statement: 'puer, pueri_, m.',
				definition: 'boy',
				notes: null,
				type: 'noun 2',
				specialSyntax: null
			}),
			servus: new Word({
				statement: 'servus, servi_, m',
				definition: 'slave',
				notes: null,
				type: 'noun 2',
				specialSyntax: null
			}),
			vir: new Word({
				statement: 'vir, viri_, m.',
				definition: 'man; husband',
				notes: null,
				type: 'noun 2',
				specialSyntax: null
			}),
			aurum: new Word({
				statement: 'aurum, auri_, n.',
				definition: 'gold',
				notes: null,
				type: 'noun 2n',
				specialSyntax: null
			}),
			bellum: new Word({
				statement: 'bellum, belli_, n.',
				definition: 'war',
				notes: null,
				type: 'noun 2n',
				specialSyntax: null
			}),
			consilium: new Word({
				statement: 'co_nsilium, co_nsilii_, n.',
				definition: 'deliberation; plan, advice; judgement',
				notes: '<p>Can mean either the act of deliberating about something (deliberation), or the \'plan\' or \'intention\' resulting from deliberation. Can also mean the capacity to deliberate (judgement), or finally a group of people who deliberate (council).</p>', // *
				type: 'noun 2n',
				specialSyntax: null
			}),
			donum: new Word({
				statement: 'do_num, do_ni_, n.',
				definition: 'gift',
				notes: null,
				type: 'noun 2n',
				specialSyntax: null
			}),
			factum: new Word({
				statement: 'factum, facti_, n.',
				definition: 'deed',
				notes: null,
				type: 'noun 2n',
				specialSyntax: null
			}),
			ferrum: new Word({
				statement: 'ferrum, ferri_, n.',
				definition: 'iron; sword',
				notes: '<p>sword - something made of iron - instance of <i>metonymy</i> (change of name), a rhetorical device</p>', // *
				type: 'noun 2n',
				specialSyntax: null
			}),
			oppidum: new Word({
				statement: 'oppidum, oppidi_, n.',
				definition: 'town',
				notes: null,
				type: 'noun 2n',
				specialSyntax: null
			}),
			periculum: new Word({
				statement: 'peri_culum, peri_culi_, n.',
				definition: 'danger',
				notes: null,
				type: 'noun 2n',
				specialSyntax: null
			}),
			verbum: new Word({
				statement: 'verbum, verbi_, n.',
				definition: 'word',
				notes: null,
				type: 'noun 2n',
				specialSyntax: null
			}),

		// LTRL Ch.2
			cura: new Word({
				statement: 'cu_ra, cu_rae, f.',
				definition: 'care, concern; anxiety',
				notes: null,
				type: 'noun 1',
				specialSyntax: null
			}),
			ira: new Word({
				statement: 'i_ra, i_rae, f.',
				definition: 'anger, wrath',
				notes: '<p>In plural, may be translated as <i>(feelings of) anger</i>.</p>',
				type: 'noun 1',
				specialSyntax: null
			}),
			poena: new Word({
				statement: 'poena, poenae, f.',
				definition: 'punishment, penalty',
				notes: null,
				type: 'noun 1',
				specialSyntax: null
			}),
			sapientia: new Word({
				statement: 'sapientia, sapientiae, f.',
				definition: 'wisdom',
				notes: null,
				type: 'noun 1',
				specialSyntax: null
			}),
			vita: new Word({
				statement: 'vi_ta, vi_tae, f.',
				definition: 'life',
				notes: null,
				type: 'noun 1',
				specialSyntax: null
			}),
			animus: new Word({
				statement: 'animus, animi_, m.',
				definition: '(rational) soul, mind; spirit; (pl.) strong feelings',
				notes: '<p>' +
								'Distinct from <span class="Latin">anima</span>, the physical soul that descends to the underworld. May mean <i>heart</i>, as the source of emotion and passion, or may indicated a specific passion.'
							 +'<br> In the plural, often means \'spirits\' in the sense of \'strong feelings\', and in certain contexts, \'anger\', \'courage\', or \'pride\'.'
							 +'</p>',
				type: 'noun 2',
				specialSyntax: null
			}),
			arma: new Word({
				statement: 'arma, armo_rum, n.pl.',
				definition: 'arms, weapons',
				notes: '', // *
				type: 'noun 2nPl',
				specialSyntax: null
			}),
			studium: new Word({
				statement: 'studium, studii_, n.',
				definition: 'zeal, enthusiasm; pursuit, study',
				notes: '<p>Expresses both an eager desire toward something and that to which one devotes one\'s attention. In politial contexts, often means <i>(partisan) support</i>.</p>',
				type: 'noun 2n',
				specialSyntax: null
			}),
			velum: new Word({
				statement: 've_lum, ve_li_, n.',
				definition: 'sail',
				notes: null,
				type: 'noun 2n',
				specialSyntax: null
			}),
			philosophus: new Word({
				statement: 'philosophus, philosophi_, m.',
				definition: 'philosopher',
				notes: null,
				type: 'noun 2',
				specialSyntax: null
			}),
			pallium: new Word({
				statement: 'pallium, pallii_, n.',
				definition: 'cloak',
				notes: null,
				type: 'noun 2n'
			}),
			barba: new Word({
				statement: 'barba, ve_li_, n.',
				definition: 'sail',
				notes: null,
				type: 'noun 2n',
				specialSyntax: null
			}),

		// LTRL Ch.2 Names
			Romulus: new Word({
				statement: 'Ro_mulus, Ro_muli_, m.',
				definition: 'Romulus',
				notes: '<p>Legendary founder of Rome, brother of Remus.</p>',
				type: 'noun 2',
				specialSyntax: null
			}),
			Remus: new Word({
				statement: 'Remus, Remi_, m.',
				definition: 'Remus',
				notes: '<p>Legendary founder of Rome, brother of Romulus.</p>',
				type: 'noun 2',
				specialSyntax: null
			}),
			Oedipus: new Word({
				statement: 'Oedipus, Oedipi_, m.',
				definition: 'Oedipus',
				notes: '<p>Solved the riddle of the Sphinx.</p>',
				type: 'noun 2',
				specialSyntax: null
			}),
			Aulus: new Word({
				statement: 'Aulus, Auli_, m.',
				definition: 'A.',
				notes: null,
				type: 'noun 2',
				specialSyntax: null
			}),
			Appius: new Word({
				statement: 'Appius, Appii_, m.',
				definition: 'App.',
				notes: null,
				type: 'noun 2',
				specialSyntax: null
			}),
			Gaius: new Word({
				statement: 'Gaius, Gai_, m.',
				definition: 'C.',
				notes: '<p>Pronounced like <b class="Latin">Gaiius, Gaii_</b>, a.k.a. <b class="Latin">Gaeius, Gaei_</b> .</p>',
				type: 'noun 2',
				specialSyntax: null
			}),
			Gnaeus: new Word({
				statement: 'Gnaeus, Gnaei_, m.',
				definition: 'Cn.',
				notes: null,
				type: 'noun 2',
				specialSyntax: null
			}),
			Decimus: new Word({
				statement: 'Decimus, Decimi_, m.',
				definition: 'D.',
				notes: null,
				type: 'noun 2',
				specialSyntax: null
			}),
			Lucius: new Word({
				statement: 'Lu_cius, Lu_cii_, m.',
				definition: 'L.',
				notes: null,
				type: 'noun 2',
				specialSyntax: null
			}),
			Marcus: new Word({
				statement: 'Marcus, Marci_, m.',
				definition: 'M.',
				notes: null,
				type: 'noun 2',
				specialSyntax: null
			}),
			Manius: new Word({
				statement: 'Manius, Manii_, m.',
				definition: 'M\'.',
				notes: null,
				type: 'noun 2',
				specialSyntax: null
			}),
			Publius: new Word({
				statement: 'Publius, Publii_, m.',
				definition: 'P.',
				notes: null,
				type: 'noun 2',
				specialSyntax: null
			}),
			Quintus: new Word({
				statement: 'Quintus, Quinti_, m.',
				definition: 'Q.',
				notes: null,
				type: 'noun 2',
				specialSyntax: null
			}),
			Sextus: new Word({
				statement: 'Sextus, Sexti_, m.',
				definition: 'Sex.',
				notes: null,
				type: 'noun 2',
				specialSyntax: null
			}),
			Servius: new Word({
				statement: 'Servius, Servii_, m.',
				definition: 'Ser.',
				notes: null,
				type: 'noun 2',
				specialSyntax: null
			}),
			Spurius: new Word({
				statement: 'Spurius, Spurii_, m.',
				definition: 'Sp.',
				notes: null,
				type: 'noun 2',
				specialSyntax: null
			}),
			Titus: new Word({
				statement: 'Titus, Titi_, m.',
				definition: 'T.',
				notes: null,
				type: 'noun 2',
				specialSyntax: null
			}),
			Tiberius: new Word({
				statement: 'Tiberius, Tiberii_, m.',
				definition: 'Ti.',
				notes: null,
				type: 'noun 2',
				specialSyntax: null
			}),
			Graecia: new Word({
				statement: 'Graecia, Graeciae, f.',
				definition: 'Greece',
				notes: null,
				type: 'noun 1',
				specialSyntax: null
			}),
			Ilium: new Word({
				statement: 'I_lium, I_lii_, n.',
				definition: 'Ilium, Troy',
				notes: null,
				type: 'noun 2n',
				specialSyntax: null
			}),
			Troia: new Word({
				statement: 'Troia, Troiae, f.',
				definition: 'Troy',
				notes: null,
				type: 'noun 1',
				specialSyntax: null
			}),
			Iulia: new Word({
				statement: 'Iu_lia, Iu_liae, f.',
				definition: 'Julia',
				notes: '<p>Augustus\'s wife</p>',
				type: 'noun 1',
				specialSyntax: null
			}),
			Livia: new Word({
				statement: 'Li_via, Li_viae, f.',
				definition: 'Livia',
				notes: '<p>Name given to the notorious daughter and granddaughter of Augustus.</p>',
				type: 'noun 1',
				specialSyntax: null
			}),

		// LTRL Ch.3
			diligentia: new Word({
				statement: 'di_ligentia, di_ligentiae, f.',
				definition: 'diligence, attentiveness',
				notes: null,
				type: 'noun 1',
				specialSyntax: null
			}),
			incola: new Word({
				statement: 'incola, incolae, m. or f.',
				definition: 'inhabitant',
				notes: 'a common gender noun, but most often masculine',
				type: 'noun 1',
				specialSyntax: null
			}),
			mora: new Word({
				statement: 'mora, morae, f.',
				definition: 'delay',
				notes: null,
				type: 'noun 1',
				specialSyntax: null
			}),
			provincia: new Word({
				statement: 'pro_vincia, pro_vinciae, f.',
				definition: 'province',
				notes: '<p>A legally defined teritory outside of Italy acquired by the Romans and made part of their <i class="Latin">imperium</i>.</p>',
				type: 'noun 1',
				specialSyntax: null
			}),
			Sicilia: new Word({
				statement: 'Sicilia, Siciliae, f.',
				definition: 'Sicily',
				notes: '<p>The first Roman <i class="Latin">'+_('pro_vincia')+'</i>.</p>',
				type: 'noun 1',
				specialSyntax: null
			}),
			terra: new Word({
				statement: 'terra, terrae, f.',
				definition: 'land, earth',
				notes: null,
				type: 'noun 1',
				specialSyntax: null
			}),
			amicus: new Word({
				statement: 'ami_cus, ami_ci_, m.',
				definition: 'friend',
				notes: null,
				type: 'noun 2',
				specialSyntax: null
			}),
			forum: new Word({
				statement: 'forum, fori_, n.',
				definition: 'public square, marketplace, forum',
				notes: '<p>The center of town where business, politics, entertainment, and public life take place.</p>',
				type: 'noun 2n',
				specialSyntax: null
			}),
			imperium: new Word({
				statement: 'imperium, imperii_, n.',
				definition: 'power, authority, command; empire',
				notes: null,
				type: 'noun 2n',
				specialSyntax: null
			}),
			inimicus: new Word({
				statement: 'inimi_cus, inimi_ci_, m.',
				definition: '(personal) enemy',
				notes: '<p>A personal enemy, as opposed to a public or political one.</p>',
				type: 'noun 2',
				specialSyntax: null
			}),
			odium: new Word({
				statement: 'odium, odii_, n.',
				definition: 'hatred',
				notes: null,
				type: 'noun 2n',
				specialSyntax: null
			}),
			populus:  new Word({
				statement: 'populus, populi_, m.',
				definition: '(the) people; populace',
				notes: '<p>A <b>collective noun</b> - regards a collection as a single entity. When used in the plural, refers to several peoples.</p>',
				type: 'noun 2',
				specialSyntax: null
			}),
			Romani: new Word({
				statement: 'Ro_ma_ni_, Ro_ma_no_rum, m.pl.',
				definition: '(the) Romans',
				notes: '<p>Although masculine, may refer to a group of mixed gender.</p>',
				type: 'noun 2Pl',
				specialSyntax: null
			}),
			nihil: new Word({
				statement: 'nihil or ni_l',
				definition: 'nothing',
				notes: '<p>An indeclinable neuter singular noun. Lacks case endings and has only one form. May perform only the functions of the nominative or accusative case.</p>',
				type: 'noun indeclinable',
				specialSyntax: null
			}),
			palliolum: new Word({
				statement: 'palliolum, pallioli_, n.',
				definition: 'little cloak',
				notes: '',
				type: 'noun 2n',
				specialSyntax: null
			}),
			acervus: new Word({
				statement: 'acervus, acervi_, m.',
				definition: 'heap, pile',
				notes: '',
				type: 'noun 2',
				specialSyntax: null
			}),
			sarcina: new Word({
				statement: 'sarcina, sarcinae, f.',
				definition: 'pack, bundle',
				notes: '',
				type: 'noun 2',
				specialSyntax: null
			}),

		// LTRL Ch.4
			causa: new Word({
				statement: 'causa, causae, f.',
				definition: 'reason, cause; case',
				notes: '<p>Has more general meaning of <i>reason</i> or <i>cause</i>, and more particular meaning of <i>legal case</i>.</p>',
				type: 'noun 1',
				specialSyntax: null
			}),
			gloria: new Word({
				statement: 'glo_ria, glo_riae, f.',
				definition: 'renown, glory',
				notes: null,
				type: 'noun 1',
				specialSyntax: null
			}),
			invidia: new Word({
				statement: 'invidia, invidiae, f.',
				definition: 'envy, jealousy; ill-will, resentment',
				notes: '<p>Derived from the verb <b class="Latin">'+_('invideo_')+'</b> = <b class="Latin">'+_('in')+'</b> + <b class="Latin">'+_('video_')+'</b> : <i>look askance at, regard with ill-will</i>.</p>',
				type: 'noun 1',
				specialSyntax: null
			}),
			sententia: new Word({
				statement: 'sententia, sententiae, f.',
				definition: 'thought, feeling; opinion',
				notes: '<p>May also refer to a written or spoken <i>sentence</i></p>',
				type: 'noun 1',
				specialSyntax: null
			}),
			altum: new Word({
				statement: 'altum, alti_, n.',
				definition: 'deep sea; height',
				notes: null,
				type: 'noun 2n',
				specialSyntax: null
			}),
			auxilium: new Word({
				statement: 'auxilium, auxilii_, n.',
				definition: 'aid, help',
				notes: '<p>An <b>abstract noun</b> - denotes something that cannot be perceived by the senses. In Latin, the plurals of abstract nouns often have concrete meanings.</p>',
				type: 'noun 2n',
				specialSyntax: null
			}),
			auxilia: new Word({
				statement: 'auxilia, auxilio_rum, n.pl.',
				definition: 'auxiliary troops',
				notes: null,
				type: 'noun 2nPl',
				specialSyntax: null
			}),
			caelum: new Word({
				statement: 'caelum, caeli_, n.',
				definition: 'sky, heaven',
				notes: null,
				type: 'noun 2n',
				specialSyntax: null
			}),
			socius: new Word({
				statement: 'socius, socii_, m.',
				definition: 'ally, comrade',
				notes: null,
				type: 'noun 2',
				specialSyntax: null
			}),

		// LTRL Ch.5
			amicitia: new Word({
				statement: 'ami_citia, ami_citiae, f.',
				definition: 'friendship',
				notes: '<p>Abstract noun, formed by the addition of the suffix <b class="Latin">-tia</b> to the stem of <b class="Latin">ami_cus, -a, -um</b>.</p>',
				type: 'noun 1',
				specialSyntax: null
			}),
			inimicitia: new Word({
				statement: 'inimi_citia, inimi_citiae, f.',
				definition: 'enmity, hostility',
				notes: '<p>Abstract noun, formed by the addition of the suffix <b class="Latin">-tia</b> to the stem of <b class="Latin">inimi_cus, -a, -um</b>. Frequently used in the plural to denote a concrete instance of enmity - \'unfriendly relations\' or \'enmity\'.</p>',
				type: 'noun 1',
				specialSyntax: null
			}),
			fatum: new Word({
				statement: 'fa_tum, fa_ti_, n.',
				definition: 'destiny, fate; (in pl., often) death',
				notes: '<p>Derived from a verb that means \'utter\', basic meaning is \'utterance\'. Being used to mean \'prophetic utterance\', came to mean \'destiny\' or \'fate\'. Plural often means \'ill fate\' and thus \'death\'. When capitalized in the plural, refers to the divine \'Fates\'.</p>',
				type: 'noun 2n',
				specialSyntax: null
			}),
			proelium: new Word({
				statement: 'proelium, proelii_, n.',
				definition: 'battle',
				notes: '<p></p>',
				type: 'noun 2n',
				specialSyntax: null
			}),

		// LTRL Ch.6
			Athenae: new Word({
				statement: 'Athe_nae, Athe_na_rum, f.pl.',
				definition: 'Athens',
				notes: null,
				type: 'noun 1Pl',
				specialSyntax: null
			}),
			natura: new Word({
				statement: 'na_tu_ra, na_tu_rae, f.',
				definition: 'nature',
				notes: null,
				type: 'noun 1',
				specialSyntax: null
			}),
			Roma: new Word({
				statement: 'Ro_ma, Ro_mae, f.',
				definition: 'Rome',
				notes: null,
				type: 'noun 1',
				specialSyntax: null
			}),
			dictum: new Word({
				statement: 'dictum, dicti_, n.',
				definition: 'word; saying',
				notes: null,
				type: 'noun 2n',
				specialSyntax: null
			}),
			domus: new Word({
				statement: 'domus, domi_, f.',
				definition: 'house, home',
				notes: null,
				type: 'noun 2',
				specialSyntax: null
			}),
			amor: new Word({
				statement: 'amor, amo_ris, m.',
				definition: 'love',
				notes: '<p>Plural form may be translated \'(feelings of) love\', \'affection\', \'love affair\', or \'object of affection\'. When capitalized, refers to the god Cupid.</p>',
				type: 'noun 3',
				specialSyntax: null
			}),
			animal: new Word({
				statement: 'animal, anima_lis, -ium, n.',
				definition: 'animal',
				notes: null,
				type: 'noun 3in',
				specialSyntax: null
			}),
			carmen: new Word({
				statement: 'carmen, carminis, n.',
				definition: 'song, poem',
				notes: _('<p>From stem of <span class="Latin">cano_</span> + <span class="Latin">-men</span>, means something sung or chanted. May mean \'hymn\', \'ritual utterance\', \'incantation\', \'play\', of \'part of a play\'. May also refer abstractly to \'poetry\' or \'song\'.</p>'),
				type: 'noun 3n',
				specialSyntax: null
			}),
			Carthago: new Word({
				statement: 'Cartha_go_, Cartha_ginis, f.',
				definition: 'Carthage',
				notes: null,
				type: 'noun 3',
				specialSyntax: null
			}),
			civis: new Word({
				statement: 'ci_vis, ci_vis, -ium, m. or f.',
				definition: 'citizen',
				notes: null,
				type: 'noun 3i',
				specialSyntax: null
			}),
			corpus: new Word({
				statement: 'corpus, corporis, n.',
				definition: 'body',
				notes: null,
				type: 'noun 3n',
				specialSyntax: null
			}),
			frater: new Word({
				statement: 'fra_ter, fra_tris, m.',
				definition: 'brother',
				notes: null,
				type: 'noun 3',
				specialSyntax: null
			}),
			homo: new Word({
				statement: 'homo_, hominis, m.',
				definition: 'human being, man; (in pl.) people',
				notes: '<p>'
						 + 'More neutral than <span class="Latin">vir</span>, which is always explicitly male, and may convey the notion of a man of honor and principle.'
						 + _('<br> When a man from an unestablished family achieved a major political office for the first time, he was called a <span class="Latin">homo_ novus</span> - new man. The term often carried an implied insult.')
						 + '<bt> The plural forms often mean \'people in general\', as opposed to <span class="Latin">populus</span>, a specific people.'
						 + '<br><u>Ex.</u> <b class="Latin">Homine_s multa impia di_cunt.</b> - <i>People say many wicked things.</i>'
						 + '</p>',
				type: 'noun 3',
				specialSyntax: null
			}),
			hostis: new Word({
				statement: 'hostis, hostis, -ium, m.',
				definition: '(public) enemy',
				notes: _('<p>Public enemy of a country, as opposed to <span class="Latin">inimi_cus</span>, a personal enemy.</p>'),
				type: 'noun 3i',
				specialSyntax: null
			}),
			ius: new Word({
				statement: 'iu_s, iu_ris, n.',
				definition: 'right, law; judgement; court',
				notes: _('<p>The abstract notion of \'law\' or \'right\', as opposed to <span class=Latin>le_x</span>, a particular law.</p>'),
				type: 'noun 3n',
				specialSyntax: null
			}),
			mare: new Word({
				statement: 'mare, maris, -ium, n.',
				definition: 'sea',
				notes: '<p>irregular genitive plural form</p>',
				type: 'noun 3in',
				specialSyntax: {
					genitive: {
						plural: 'marum'
					}
				}
			}),
			mater: new Word({
				statement: 'ma_ter, ma_tris, f.',
				definition: 'mother',
				notes: null,
				type: 'noun 3',
				specialSyntax: null
			}),
			mens: new Word({
				statement: 'me_ns, mentis, -ium, f.',
				definition: 'mind; intention, purpose; attitude',
				notes: '<p>mind - seat of intellectual activity; intention, purpose - result of that activity; attitude - frame of mind</p>',
				type: 'noun 3i',
				specialSyntax: null
			}),
			miles: new Word({
				statement: 'mi_les, mi_litis, m.',
				definition: 'soldier',
				notes: null,
				type: 'noun 3',
				specialSyntax: null
			}),
			moenia: new Word({
				statement: 'moenia, moenium, n.pl.',
				definition: '(city) walls',
				notes: null,
				type: 'noun 3inPl',
				specialSyntax: null
			}),
			pater: new Word({
				statement: 'pater, patris, m.',
				definition: 'father',
				notes: null,
				type: 'noun 3',
				specialSyntax: null
			}),
			rex: new Word({
				statement: 're_x, re_gis, m.',
				definition: 'king',
				notes: null,
				type: 'noun 3',
				specialSyntax: null
			}),
			rus: new Word({
				statement: 'ru_s, ru_ris, n.',
				definition: '(in sing. or pl.) countryside',
				notes: '<p>Often translated in the singular when found in the plural.</p>',
				type: 'noun 3n',
				specialSyntax: null
			}),
			servitus: new Word({
				statement: 'servitu_s, sevitu_tis, f.',
				definition: 'slavery',
				notes: null,
				type: 'noun 3',
				specialSyntax: null
			}),
			soror: new Word({
				statement: 'soror, soro_ris, f.',
				definition: 'sister',
				notes: null,
				type: 'noun 3',
				specialSyntax: null
			}),
			timor: new Word({
				statement: 'timor, timo_ris, m.',
				definition: 'fear',
				notes: null,
				type: 'noun 3',
				specialSyntax: null
			}),
			urbs: new Word({
				statement: 'urbs, urbis, -ium, f.',
				definition: 'city',
				notes: '<p>Final <b>-bs</b> pronounced <b>ps</b>. <span class=Latin">Urbs</span> often refers specifically to Rome, while <span class=Latin">oppidum</span> designates a smaller town in Italy.</p>',
				type: 'noun 3i',
				specialSyntax: null
			}),
			vis: new Word({
				statement: 'vi_s, -, -ium, f.',
				definition: 'force, power; violence; (in pl.) (physical) strength',
				notes: '<p>irregular forms</p>',
				type: 'noun 3i',
				specialSyntax: {
					nominative: {
						singular: _('vi_s'),
						plural: _('vi_re_s')
					},
					genitive: {
						singular: _('-'),
						plural: _('vi_rium')
					},
					dative: {
						singular: _('-'),
						plural: _('vi_ribus')
					},
					accusative: {
						singular: _('vim'),
						plural: _('vi_re_s / vi_ri_s')
					},
					ablative: {
						singular: _('vi_'),
						plural: _('vi_ribus')
					},
					vocative: {
						singular: _('vi_s'),
						plural: _('vi_re_s')
					}
				}
			}),

		// Wheelock Ch. 1
			// adverbium: new Word({
			// 	statement: 'adverbium, adverbii_, n.',
			// 	definition: 'adverb',
			// 	notes: null,
			// 	type: 'noun 2n',
			// 	specialSyntax: null
			// }),
			// exercitatio: new Word({
			// 	statement: 'exercita_tio_, exercita_tio_nis, f.',
			// 	definition: 'exercise',
			// 	notes: null,
			// 	type: 'noun 3',
			// 	specialSyntax: null
			// }),
			// introductio: new Word({
			// 	statement: 'intro_ductio_, intro_ductio_nis, f.',
			// 	definition: 'introduction, preface',
			// 	notes: null,
			// 	type: 'noun 3',
			// 	specialSyntax: null
			// }),
			// coniugatio: new Word({
			// 	statement: 'coniuga_tio_, coniuga_tio_nis, f.',
			// 	definition: 'conjugation',
			// 	notes: null,
			// 	type: 'noun 3',
			// 	specialSyntax: null
			// }),
			// vocabulum: new Word({
			// 	statement: 'voca_bulum, voca_buli_, n.',
			// 	definition: 'designation, name, expression',
			// 	notes: null,
			// 	type: 'noun 2n',
			// 	specialSyntax: null
			// }),
			// lectio: new Word({
			// 	statement: 'le_ctio_, le_ct_io_nis, f.',
			// 	definition: 'reading, perusal',
			// 	notes: null,
			// 	type: 'noun 3',
			// 	specialSyntax: null
			// }),
			// translatio: new Word({
			// 	statement: 'transla_tio_, transla_t_io_nis, f.',
			// 	definition: 'translation',
			// 	notes: null,
			// 	type: 'noun 3',
			// 	specialSyntax: null
			// }),
			// labor: new Word({
			// 	statement: 'labor, labo_ris, m.',
			// 	definition: 'work, labor',
			// 	notes: null,
			// 	type: 'noun 3',
			// 	specialSyntax: null
			// }),
			// scriptum: new Word({
			// 	statement: 'scri_ptum, scri_pti_, n.',
			// 	definition: 'text, writing',
			// 	notes: null,
			// 	type: 'noun 2n',
			// 	specialSyntax: null
			// }),
			// paries: new Word({
			// 	statement: 'parie_s, parietis, m.',
			// 	definition: 'wall (of a house or room)',
			// 	notes: null,
			// 	type: 'noun 3',
			// 	specialSyntax: null
			// }),
			// regula: new Word({
			// 	statement: 're_gula, re_gulae, f.',
			// 	definition: 'rule',
			// 	notes: null,
			// 	type: 'noun 1',
			// 	specialSyntax: null
			// }),
			// regio: new Word({
			// 	statement: 'regio_, regio_nis, f.',
			// 	definition: 'region',
			// 	notes: null,
			// 	type: 'noun 3',
			// 	specialSyntax: null
			// }),
			// nomen: new Word({
			// 	statement: 'no_men, no_minis, n.',
			// 	definition: 'name, title, noun',
			// 	notes: null,
			// 	type: 'noun 3n',
			// 	specialSyntax: null
			// }),
			// gaudium: new Word({
			// 	statement: 'gaudium, gaudii_, n.',
			// 	definition: 'joy, delight',
			// 	notes: null,
			// 	type: 'noun 2n',
			// 	specialSyntax: null
			// }),
			// adiectivum: new Word({
			// 	statement: 'adiecti_vum, adiecti_vi_, n.',
			// 	definition: 'adjective',
			// 	notes: null,
			// 	type: 'noun 2n',
			// 	specialSyntax: null
			// }),
			// liberi: new Word({
			// 	statement: 'li_beri_, li_bero_rum, m. pl.',
			// 	definition: 'children',
			// 	notes: '<p>'
			// 					+ '<span class="Latin">' + _('Li_beri_, li_bero_rum, m. pl.') + '</span> is a substantive of the adjective <span class="Latin">'+ _('li_ber, li_bera, li_berum') +'</span> (<i>free</i>), and is regularly used only in contexts where there is reference made to parents.'
			// 					+ '</p>',
			// 	type: 'adjective 1,2',
			// 	specialSyntax: ''
			// }),

			// LTRL Ch.6 Names

			Iuppiter: new Word({
				statement: 'Iuppiter, Iovis, m.',
				definition: 'Jupiter (Greek: Zeus)',
				notes: '<p>king of the gods, god of sky, weather</p>',
				type: 'noun 3',
				specialSyntax: ''
			}),
			Iuno: new Word({
				statement: 'Iu_no_, Iu_no_nis, f.',
				definition: 'Juno (Greek: Hera)',
				notes: '<p>goddess of women, marriage</p>',
				type: 'noun 3',
				specialSyntax: ''
			}),
			Neptunus: new Word({
				statement: 'Neptu_nus, Neptu_ni_, m.',
				definition: 'Neptune (Greek: Poseidon)',
				notes: '<p>god of the sea</p>',
				type: 'noun 2',
				specialSyntax: ''
			}),
			Dis: new Word({
				statement: 'Di_s, Di_tis, m.',
				definition: 'Dis ("Rich one"), Pluto (Greek: Pluto, Hades)',
				notes: '<p>god of the underworld</p>',
				type: 'noun 3',
				specialSyntax: ''
			}),
			Ceres: new Word({
				statement: 'Cere_s, Cereris, f.',
				definition: 'Ceres (Greek: Demeter)',
				notes: '<p>goddess of agriculture</p>',
				type: 'noun 3',
				specialSyntax: ''
			}),
			Vesta: new Word({
				statement: 'Vesta, Vestae, f.',
				definition: 'Vesta (Greek: Hestia)',
				notes: '<p>goddess of the hearth</p>',
				type: 'noun 1',
				specialSyntax: ''
			}),
			Venus: new Word({
				statement: 'Venus, Veneris, f.',
				definition: 'Venus (Greek: Aphrodite)',
				notes: '<p>goddess of desire, passion</p>',
				type: 'noun 3',
				specialSyntax: ''
			}),
			Amor: new Word({
				statement: 'Amor, Amo_ris, m.',
				definition: 'Love, Amor (Greek: Eros)',
				notes: '<p>son of Venus, god of desire, passion (another name for <span class="Latin">'+_('Cupi_do_')+'</span>)</p>',
				type: 'noun 3',
				specialSyntax: ''
			}),
			Cupido: new Word({
				statement: 'Cupi_do_, Cupi_dinis, m.',
				definition: 'Cupid (Greek: Eros)',
				notes: '<p>son of Venus, god of desire, passion (another name for <span class="Latin">Amor</span>)</p>',
				type: 'noun 3',
				specialSyntax: ''
			}),
			Apollo: new Word({
				statement: 'Apollo_, Apollinis, m.',
				definition: 'Apollo (Greek: Apollo)',
				notes: '<p>god of the arts (medicine, poetry, etc.)</p>',
				type: 'noun 3',
				specialSyntax: ''
			}),
			Diana: new Word({
				statement: 'Dia_na, Dia_nae, f.',
				definition: 'Diana (Greek: Artemis)',
				notes: '<p>goddess of virginity, hunting</p>',
				type: 'noun 1',
				specialSyntax: ''
			}),
			Minerva: new Word({
				statement: 'Minerva, Mivervae, f.',
				definition: 'Minerva (Greek: Athena)',
				notes: '<p>goddess of arts, sciences, wisdom</p>',
				type: 'noun 1',
				specialSyntax: ''
			}),
			Mars: new Word({
				statement: 'Mars, Martis, m.',
				definition: 'Mars (Greek: Ares)',
				notes: '<p>god of war</p>',
				type: 'noun 3',
				specialSyntax: ''
			}),
			Mercurius: new Word({
				statement: 'Mercurius, Mercurii_, m.',
				definition: 'Mercury (Greek: Hermes)',
				notes: '<p>messenger god, conductor of souls</p>',
				type: 'noun 2',
				specialSyntax: ''
			}),
			Vulcanus: new Word({
				statement: 'Vulca_nus, Vulca_ni_, m.',
				definition: 'Vulcan (Greek: Hephaestus)',
				notes: '<p>god of fire</p>',
				type: 'noun 2',
				specialSyntax: ''
			}),
			Bacchus: new Word({
				statement: 'Bacchus, Bacchi_, m.',
				definition: 'Bacchus (Greek: Dionysus)',
				notes: '<p>god of wine (another name for <span class="Latin">'+_('Li_ber')+'</span>)</p>',
				type: 'noun 2',
				specialSyntax: ''
			}),
			Liber: new Word({
				statement: 'Li_ber, Li_beri_, m.',
				definition: 'Liber ("Free one") (Greek: Dionysus)',
				notes: '<p>god of wine (another name for <span class="Latin">Bacchus</span>)</p>',
				type: 'noun 2',
				specialSyntax: ''
			}),
			Dido: new Word({
				statement: 'Di_do_, Di_do_nis, f.',
				definition: 'Dido',
				notes: '<p>Phoenician princess who flees Phoenicia to found Carthage, Rome\'s archenemy. Falls in love with Aeneas, and commits suicide when he reluctantly leaves her for Italy.</p>',
				type: 'noun 3',
				specialSyntax: ''
			}),
			Latinus: new Word({
				statement: 'Lati_nus, Lati_ni_, m.',
				definition: 'Latinus',
				notes: '<p>King of Latium (central Italy), marries Aeneas to his daughter Lavinia, inviting the hostility of Turnus, king of the Rutulians, who wished to be married to Lavinia himself.</p>',
				type: 'noun 2',
				specialSyntax: ''
			}),
			Priamus: new Word({
				statement: 'Priamus, Priami_, m.',
				definition: 'Priam',
				notes: '<p>King of Troy, father of Hector, Paris, and others; killed at Troy by the son of Achilles.</p>',
				type: 'noun 2',
				specialSyntax: ''
			}),
			Turnus: new Word({
				statement: 'Turnus, Turni_, m.',
				definition: 'Turnus',
				notes: '<p>A king of an Italic people, the Rutulians; becomes Aeneas\'s bitter enemy after Latinus, the king of Latium (central Italy) marries his daughter Lavinia to Aeneas rather than Turnus.</p>',
				type: 'noun 2',
				specialSyntax: ''
			}),
			Iulius: new Word({
				statement: 'C. Iu_lius Caesar, C. Iu_lii_ Caesaris, m.',
				definition: 'Gaius Julius Caesar',
				notes: '<p>Caesar was also taken as a <span class="Latin">'+_('cogno_men')+'</span> by all succeeding emperors until Hadrian in the second century A.D.</p>',
				type: 'noun 2 name 3',
				specialSyntax: {
					vocative: {
						singular: 'C. Iuli_ Caesar'
					}
				}
			}),
			Cato: new Word({
				statement: 'M. Porcius Cato_, M. Porcii_ Cato_nis, m.',
				definition: 'Marcus Porcius Cato',
				notes: '<p>Two important Romans named Marcus Porcius Cato: Cato the Elder (<span class="Latin">'+_('Cato_ Maior')+'</span>), and Cato of Utica (<span class="Latin">'+_('Cato_ Utice_nsis')+'</span>). The latter, also known as Cato the Censor, is the former\'s great-grandson, who fought on Pompey\'s side against Julius Caesar and committed suicide rather than accept Caesar\'s pardon.</p>',
				type: 'noun 2 name 3',
				specialSyntax: {
					vocative: {
						singular: 'M. Porci_ Cato'
					}
				}
			}),
			Cicero: new Word({
				statement: 'M. Tullius Cicero_, M. Tulii_ Cicero_nis, m.',
				definition: 'Marcus Tullius Cicero',
				notes: '<p></p>',
				type: 'noun 2 name 3',
				specialSyntax: {
					vocative: {
						singular: 'M. Tulli_ Cicero_'
					}
				}
			}),
			Hannibal: new Word({
				statement: 'Hannibal, Hannibalis, m.',
				definition: 'Hannibal',
				notes: '<p>Leader of the Cartaginians during the second Punic war. Invaded Italy and won many important battles, nearly succeeding in subduing Rome.</p>',
				type: 'noun 3',
				specialSyntax: ''
			}),
			Naso: new Word({
				statement: 'P. Ovidius Na_so_, P. Ovidii_ Na_so_nis, m.',
				definition: 'Publius Ovidius Naso (Ovid)',
				notes: '<p></p>',
				type: 'noun 2 name 3',
				specialSyntax: ''
			}),
			Propertius: new Word({
				statement: 'Sex. Propertius, Sex. Propertii_, m.',
				definition: 'Sextus Propertius (Propertius)',
				notes: '<p></p>',
				type: 'noun 2',
				specialSyntax: ''
			}),
			Maro: new Word({
				statement: 'P. Vergilius Maro_, P. Vergilii_ Maro_nis, m.',
				definition: 'Publius Vergilius Maro (Vergil)',
				notes: '<p></p>',
				type: 'noun 2 name 3',
				specialSyntax: ''
			}),
			Corinna: new Word({
				statement: 'Corinna, Corinnae, f.',
				definition: 'Corinna',
				notes: '<p>Beloved of Ovid</p>',
				type: 'noun 1',
				specialSyntax: ''
			}),
			Cynthia: new Word({
				statement: 'Cynthia, Cynthiae, f.',
				definition: 'Cynthia',
				notes: '<p>Beloved of Propertius</p>',
				type: 'noun 1',
				specialSyntax: ''
			}),
			Lesbia: new Word({
				statement: 'Lesbia, Lesbiae, f.',
				definition: 'Lesbia',
				notes: '<p>Beloved of Catullus</p>',
				type: 'noun 1',
				specialSyntax: ''
			}),

		// LTRL Ch.7
			ara: new Word({
				statement: 'a_ra, a_rae, f.',
				definition: 'altar',
				notes: null,
				type: 'noun 1',
				specialSyntax: null
			}),
			copia: new Word({
				statement: 'co_pia, co_piae, f.',
				definition: 'abundance; (in pl.) troops, forces',
				notes: null,
				type: 'noun 1',
				specialSyntax: null
			}),
			fortuna: new Word({
				statement: 'fortu_na, fortu_nae, f.',
				definition: 'fortune, chance',
				notes: '<p>Something opposed to reason or predictability. May be good or bad and is often personified as the divine agent Fortune.</p>',
				type: 'noun 1',
				specialSyntax: null
			}),
			insidiae: new Word({
				statement: 'i_nsidiae, i_nsidia_rum, f.pl.',
				definition: 'ambush, plot, treachery',
				notes: null,
				type: 'noun 1Pl',
				specialSyntax: null
			}),
			umbra: new Word({
				statement: 'umbra, umbrae, f.',
				definition: 'shadow, shade',
				notes: null,
				type: 'noun 1',
				specialSyntax: null
			}),
			ingenium: new Word({
				statement: 'ingenium, ingenii_, n.',
				definition: 'ability, talent; disposition',
				notes: '<p>Any quality that is inborn or inherent in an individual or species.</p>',
				type: 'noun 2n',
				specialSyntax: null
			}),
			templum: new Word({
				statement: 'templum, templi_, n.',
				definition: 'temple',
				notes: null,
				type: 'noun 2n',
				specialSyntax: null
			}),
			ars: new Word({
				statement: 'ars, artis, -ium, f.',
				definition: 'skill, art; guile, trick',
				notes: '<p>Any "skill" acquired through practice. May be used of any "craft" or "trade." May also mean a specific body of knowledge (e.g. the "art" or "science" of divination). Sometimes used of a particular "work of art."'
								+'<br>In contrast to <b class="Latin">na_tu_ra</b> or <b class="Latin">ingenium</b>, may have a negative sense (artificiality, craftiness), or a positive one (art). From the idea of artificiality, it comes to mean "guile" or "trick."'
								+'<br>The term <b class="Latin">bonae arte_s</b> means "liberal studies" or "cultural pursuits," those pursuits that are the mark of a civilized society.'
								+'</p>',
				type: 'noun 3i',
				specialSyntax: null
			}),
			civitas: new Word({
				statement: 'ci_vita_s, ci_vita_tis, f.',
				definition: 'state, citizenry; citizenship',
				notes: '<p>An abstract noun formed by the addition of the suffix <b class="Latin">-ta_s</b> to the stem of the noun <b class="Latin">ci_vis</b>. May mean the community to which one belongs (state, citizenry), or the rights one has a citizen (citizenship).</p>',
				type: 'noun 3',
				specialSyntax: null
			}),
			mors: new Word({
				statement: 'mors, mortis, -ium, f.',
				definition: 'death',
				notes: null,
				type: 'noun 3i',
				specialSyntax: null
			}),
			pars: new Word({
				statement: 'pars, partis, -ium, f.',
				definition: 'part',
				notes: '<p>May take a plural verb. May also mean "side," "position," or "opinion" held or taken in such phrases as <b class="Latin">ex mea_ parte</b> - <i>from my side</i>. In both the singular and plural, may refer to a political "faction" or to either "side" in a lawsuit or trial.</p>',
				type: 'noun 3i',
				specialSyntax: null
			}),
			virtus: new Word({
				statement: 'virtu_s, virtu_tis, f.',
				definition: 'manliness, courage; excellence, virtue',
				notes: '<p>An abstract noun formed by the addition of the suffix <b class="Latin">-tu_s</b> to the stem of the noun <b class="Latin">vir</b>.</p>',
				type: 'noun 3',
				specialSyntax: null
			}),
			vox: new Word({
				statement: 'vo_x, vo_cis, f.',
				definition: 'voice; word',
				notes: '<p>The singular may also be used to refer to an "utterance" or "speech."</p>',
				type: 'noun 3',
				specialSyntax: null
			}),

		// LTRL Ch.8
			fuga: new Word({
				statement: 'fuga, fugae, f.',
				definition: 'flight',
				notes: '<p>Often found with a Subjective Genitive. May refer to an act of fleeing or the rapidity with which someone or something moves.</p>',
				type: 'noun 1',
				specialSyntax: null
			}),
			annus: new Word({
				statement: 'annus, anni_, m.',
				definition: 'year',
				notes: null,
				type: 'noun 2',
				specialSyntax: null
			}),
			locus: new Word({
				statement: 'locus, loci_, m.',
				definition: 'place',
				notes: '<p>May mean 1. a physical place, 2. a "position," "rank," or "post" in society, or 3. "room" or "opportunity" to engage in an activity. The plural is often declined as if it were neuter, but sometimes the masculine declension is retained, particularly when it means "passages" in a written work or "topics" or "subjects."</p>',
				type: 'noun 2',
				specialSyntax: {
					nominative: {
						plural: 'loca'
					},
					genitive: {
						plural: _('loco_rum')
					},
					dative: {
						plural: _('loci_s')
					},
					accusative: {
						plural: 'loca'
					},
					ablative: {
						plural: _('loci_s')
					},
					vocative: {
						plural: 'loca'
					}
				}
			}),
			consul: new Word({
				statement: 'co_nsul, co_nsulis, m.',
				definition: 'consul',
				notes: '<p>The highest political magistrate in Rome at the time of the Republic.</p>',
				type: 'noun 3',
				specialSyntax: null
			}),
			nox: new Word({
				statement: 'nox, noctis, -ium, f.',
				definition: 'night',
				notes: null,
				type: 'noun 3i',
				specialSyntax: null
			}),
			tempus: new Word({
				statement: 'tempus, temporis, n.',
				definition: 'time',
				notes: null,
				type: 'noun 3n',
				specialSyntax: null
			}),
			consulatus: new Word({
				statement: 'co_nsula_tus, co_nsula_tu_s, m.',
				definition: 'consulship',
				notes: '<p>An abstract noun formed by the addition of the suffix <b class="Latin">-a_tus</b> to the stem of the noun <b class="Latin">co_nsul</b>.</p>',
				type: 'noun 4',
				specialSyntax: null
			}),
			domus4: new Word({
				statement: 'domus, domu_s, f.',
				definition: 'house, home',
				notes: '<p>Declined in both the second and fourth declensions.</p>',
				type: 'noun 4',
				specialSyntax: null
			}),
			exercitus: new Word({
				statement: 'exercitus, exercitu_s, m.',
				definition: 'army',
				notes: null,
				type: 'noun 4',
				specialSyntax: null
			}),
			manus: new Word({
				statement: 'manus, manu_s, f.',
				definition: 'hand; band, troop',
				notes: null,
				type: 'noun 4',
				specialSyntax: null
			}),
			motus: new Word({
				statement: 'mo_tus, mo_tu_s, m.',
				definition: 'motion, movement; disturbance',
				notes: '<p>An abstract noun formed by the addition of the suffix <b class="Latin">-tus</b> to a stem of the verb <b class="Latin">moveo_</b>. Means "disturbance" in the sense of being the result of motion or movement.</p>',
				type: 'noun 4',
				specialSyntax: null
			}),
			senatus: new Word({
				statement: 'sena_tus, sena_tu_s, m.',
				definition: 'senate',
				notes: '<p>An abstract noun formed by the addition of the suffix <b class="Latin">-a_tus</b> to the stem of the substantive <b class="Latin">senex</b> (old man). The senate was the highest deliberating body in Rome.</p>',
				type: 'noun 4',
				specialSyntax: {
					genitive: {
						singular: _('sena_tu_s, sena_ti_')
					}
				}
			}),
			acies: new Word({
				statement: 'acie_s, acie_i_, f.',
				definition: 'sharp edge; keenness; battle line',
				notes: null,
				type: 'noun 5',
				specialSyntax: null
			}),
			dies: new Word({
				statement: 'die_s, die_i_, m. or f.',
				definition: 'day',
				notes: '<p>Regularly masculine, but usually feminine when referring to a festival day, a day appointed for a business transaction, or the date of a letter.</p>',
				type: 'noun 5',
				specialSyntax: null
			}),
			fides: new Word({
				statement: 'fide_s, fidei_, f.',
				definition: 'faith, trust; trustworthiness; confidence',
				notes: null,
				type: 'noun 5',
				specialSyntax: null
			}),
			res: new Word({
				statement: 're_s, rei_, f.',
				definition: 'thing; property; matter, affair; activity; situation',
				notes: null,
				type: 'noun 5',
				specialSyntax: null
			}),
			species: new Word({
				statement: 'specie_s, specie_i_, f.',
				definition: 'appearance, aspect',
				notes: null,
				type: 'noun 5',
				specialSyntax: {
					genitive: {
						singular: '-'
					}
				}
			}),
			salus: new Word({
				statement: 'salu_s, salu_tis, f.',
				definition: 'safety; health',
				notes: null,
				type: 'noun 3',
				specialSyntax: null
			}),

		// LTRL Ch.9
			exsilium: new Word({
				statement: 'ex(s)ilium, ex(s)ilii_, n.',
				definition: 'exile, banishment',
				notes: '<p>May refer to the act of banishment or the place to which one is exiled.</p>',
				type: 'noun 2n',
				specialSyntax: null
			}),
			modus: new Word({
				statement: 'modus, modi_, m.',
				definition: 'measure; limit; rhythm, meter; manner, way',
				notes: '<p>The prepositional phrases <b class="Latin">in...modum</b> and <b class="Latin">ad...modum</b> (in the manner, according to the manner), frequently occur with a genitive or with an adjective modifying <b class="Latin">modum</b>.'
								+'<br><u>Ex:</u> <b class="Latin">Re_gis in/ad modum di_xit</b> - <i>She spoke in/according to the manner of a king.</i>'
								+'<br><u>Ex:</u> <b class="Latin">In/Ad hunc modum di_xit.</b> - <i>She spoke in/according to this manner.</i>'
								+'</p>',
				type: 'noun 2',
				specialSyntax: null
			}),
			oculus: new Word({
				statement: 'oculus, oculi_, m.',
				definition: 'eye',
				notes: null,
				type: 'noun 2',
				specialSyntax: null
			}),
			lex: new Word({
				statement: 'le_x, le_gis, f.',
				definition: 'law',
				notes: '<p>Refers to a particular law proposed (bill) or passed (statute). May also refer to the collective legal authority of a state.</p>',
				type: 'noun 3',
				specialSyntax: null
			}),
			libertas: new Word({
				statement: 'li_berta_s, li_berta_tis, f.',
				definition: 'freedom',
				notes: '<p>An abstract noun formed by the addition of the suffix <b class="Latin">-ta_s</b> to the stem of the adjective <b class="Latin">li_ber</b>.</p>',
				type: 'noun 3',
				specialSyntax: null
			}),
			pax: new Word({
				statement: 'pa_x, pa_cis, f.',
				definition: 'peace; favor',
				notes: null,
				type: 'noun 3',
				specialSyntax: null
			}),
			metus: new Word({
				statement: 'metus, metu_s, m.',
				definition: 'fear, dread, anxiety',
				notes: '<p>Refers to the more general concept of fear or dread, while <b class="Latin">timor</b> refers to a more immediate fear.</p>',
				type: 'noun 4',
				specialSyntax: null
			}),
			spes: new Word({
				statement: 'spe_s, spei_, f.',
				definition: 'hope',
				notes: null,
				type: 'noun 5',
				specialSyntax: null
			}),

		// LTRL Ch.10
			legatus: new Word({
				statement: 'le_ga_tus, le_ga_ti_, m.',
				definition: 'legate, envoy; lieutenant',
				notes: '<p>Involved in matters of diplomacy (envoy), or an assistant to a commander or governor (lieutenant).</p>',
				type: 'noun 2',
				specialSyntax: null
			}),
			natus: new Word({
				statement: 'na_tus, na_ti_, m.',
				definition: 'son',
				notes: '<p>"Having been born" - a substantive of the perfect passive participle of <b class="Latin">na_scor</b>. Less common is <b class="Latin">na_ta, na_tae</b>, the feminine substantive.</p>',
				type: 'noun 2',
				specialSyntax: null
			}),
			dux: new Word({
				statement: 'dux, ducis, m. or f.',
				definition: 'leader',
				notes: null,
				type: 'noun 3',
				specialSyntax: null
			}),
			finis: new Word({
				statement: 'fi_nis, fi_nis, -ium, m. or f.',
				definition: 'end, limit, boundary; (in pl.) territory',
				notes: '<p>Usually masculine, sometimes singular is feminine.</p>',
				type: 'noun 3i',
				specialSyntax: null
			}),
			genus: new Word({
				statement: 'genus, generis, n.',
				definition: 'descent, origin; race, stock; kind, sort',
				notes: null,
				type: 'noun 3n',
				specialSyntax: null
			}),
			labor: new Word({
				statement: 'labor, labo_ris, m.',
				definition: 'work; effort, hardship',
				notes: null,
				type: 'noun 3',
				specialSyntax: null
			}),
			mos: new Word({
				statement: 'mo_s, mo_ris, m.',
				definition: 'custom, practice; (in pl., sometimes) character',
				notes: null,
				type: 'noun 3',
				specialSyntax: null
			}),
			nemo: new Word({
				statement: 'ne_mo_, ne_minis, m. or f.',
				definition: 'no one',
				notes: '<p>Occurs in the singular only. The genitive and ablative singular forms are usually replaced by the genitive and ablative singular forms of the adjective <b class="Latin">nu_llus, -a, -um</b>.</p>',
				type: 'noun 3',
				specialSyntax: {
					nominative: {
						plural: '-'
					},
					genitive: {
						singular: _('nu_lli_us / ne_minis'),
						plural: '-'
					},
					dative: {
						plural: '-'
					},
					accusative: {
						plural: '-'
					},
					ablative: {
						singular: _('nu_llo_ , nu_lla / ne_mine'),
						plural:   '-'
					},
					vocative: {
						plural: '-'
					}
				}
			}),
			opus: new Word({
				statement: 'opus, operis, n.',
				definition: 'work; need',
				notes: null,
				type: 'noun 3n',
				specialSyntax: null
			}),
			oratio: new Word({
				statement: 'o_ra_tio_, o_ra_tio_nis, f.',
				definition: 'oration, speech',
				notes: '<p>Can have abstract or specific meaning.</p>',
				type: 'noun 3',
				specialSyntax: null
			}),
			orator: new Word({
				statement: 'o_ra_tor, o_ra_to_ris, m.',
				definition: 'speaker',
				notes: '',
				type: 'noun 3',
				specialSyntax: null
			}),
			pectus: new Word({
				statement: 'pectus, pectoris, n.',
				definition: 'chest, breast; heart',
				notes: '<p>In plural, may be translated as singular to refer to a specific person\'s heart or soul.</p>',
				type: 'noun 3n',
				specialSyntax: null
			}),
			casus: new Word({
				statement: 'ca_sus, ca_su_s, m.',
				definition: 'fall; occurrence; chance, misfortune',
				notes: '<p>An abstract noun formed by the addition of the suffix <b class="Latin">-tus</b> to a stem of the verb <b class="Latin">cado_</b>.</p>',
				type: 'noun 4',
				specialSyntax: null
			}),

		// LTRL Ch.11
			audacia: new Word({
				statement: 'auda_cia, auda_ciae, f.',
				definition: 'boldness; recklessness, audacity',
				notes: '<p>Can have positive sense (boldness, confidence), or negative sense (recklessness, audacity)</p>',
				type: 'noun 1',
				specialSyntax: null
			}),
			campus: new Word({
				statement: 'campus, campi_, m.',
				definition: '(flat) plain',
				notes: '<p>When unaccompanied by an adjective, may refer to the famous <b class="Latin">Campus Martius</b> of Rome.</p>',
				type: 'noun 2',
				specialSyntax: null
			}),
			castra: new Word({
				statement: 'castra, castro_rum, n. pl.',
				definition: '(military) camp',
				notes: '',
				type: 'noun 2nPl',
				specialSyntax: null
			}),
			murus: new Word({
				statement: 'mu_rus, mu_ri_, m.',
				definition: 'wall',
				notes: '',
				type: 'noun 2',
				specialSyntax: null
			}),
			paulum: new Word({
				statement: 'paulum, pauli_, n.',
				definition: 'small amount, a little',
				notes: '<p>Appears in the nominative, accusative, and ablative singular only. Often functions as an Ablative of Degree of Difference. Also commonly found with a Partitive Genitive.</p>',
				type: 'noun 2n',
				specialSyntax: null
			}),
			signum: new Word({
				statement: 'signum, signi_, n.',
				definition: 'sign, signal; standard',
				notes: '',
				type: 'noun 2n',
				specialSyntax: null
			}),
			telum: new Word({
				statement: 'te_lum, te_li_, n.',
				definition: 'spear; weapon',
				notes: '',
				type: 'noun 2n',
				specialSyntax: null
			}),
			ignis: new Word({
				statement: 'ignis, ignis, -ium m.',
				definition: 'fire',
				notes: '',
				type: 'noun 3i',
				specialSyntax: {
					ablative: {
						singular: _('igni_ / igne')
					}
				}
			}),
			imperator: new Word({
				statement: 'impera_tor, impera_to_ris, m.',
				definition: 'commander, general',
				notes: '<p>One who gives orders (stem of <b class="Latin">impero_</b> + <b class="Latin">-tor</b>).</p>',
				type: 'noun 3',
				specialSyntax: null
			}),
			legio: new Word({
				statement: 'legio_, legio_nis, f',
				definition: 'legion',
				notes: '<p>The largest unit of the Roman army (4,200 - 6,000 men).</p>',
				type: 'noun 3',
				specialSyntax: null
			}),
			lux: new Word({
				statement: 'lu_x, lu_cis, f.',
				definition: 'light, daylight',
				notes: '<p>Literal or metaphorical light.</p>',
				type: 'noun 3',
				specialSyntax: null
			}),
			maiores: new Word({
				statement: 'maio_re_s, maio_rum, m.pl.',
				definition: 'ancestors',
				notes: '<p>A substantive of the comparative adjective <b class="Latin">maior, maius</b>.</p>',
				type: 'noun 3Pl',
				specialSyntax: null
			}),
			sensus: new Word({
				statement: 'se_nsus, se_nsu_s, m.',
				definition: 'perception, feeling; sense',
				notes: '',
				type: 'noun 4',
				specialSyntax: null
			}),

		// LTRL Ch.12
			murus: new Word({
				statement: 'gra_tia, gra_tiae, f.',
				definition: 'favor, kindness; gratitude, thanks',
				notes: '',
				type: 'noun 1',
				specialSyntax: null
			}),
			littera: new Word({
				statement: 'littera, litterae, f.',
				definition: 'letter (of the alphabet); (in pl.) letter, epistle',
				notes: '<p>In plural, may take an adjective of quantity or number to indicate more than one letter. May also mean in plural "(humane) letters," "literature."</p>',
				type: 'noun 1',
				specialSyntax: null
			}),
			memoria: new Word({
				statement: 'memoria, memoriae, f.',
				definition: 'memory',
				notes: '',
				type: 'noun 1',
				specialSyntax: null
			}),
			dubium: new Word({
				statement: 'dubium, dubii_, n.',
				definition: 'doubt, hesitation',
				notes: '<p>Substantive of the adjective <b class="Latin">dubius, -a, -um</b>. Regularly appears with an Indirect Question or a Doubting clause.</p>',
				type: 'noun 2n',
				specialSyntax: null
			}),
			gens: new Word({
				statement: 'ge_ns, gentis, -ium, f.',
				definition: 'nation, people; clan, family',
				notes: '<p>Among Roman citiens, a group of families that shared the same name. May also refer to an individual family. In plural, may mean "nations of the world", or "the human race" as a whole.</p>',
				type: 'noun 3i',
				specialSyntax: null
			}),
			fors: new Word({
				statement: 'fors, fortis, -ium, f.',
				definition: 'chance, luck',
				notes: '',
				type: 'noun 3i',
				specialSyntax: null
			}),
			mons: new Word({
				statement: 'mo_ns, montis, -ium, m.',
				definition: 'mountain',
				notes: '',
				type: 'noun 3i',
				specialSyntax: null
			}),
			rumor: new Word({
				statement: 'ru_mor, ru_mo_ris, m.',
				definition: 'rumor',
				notes: '<p>May refer more generally to the "noise" made by many voices. The phrase <b class="Latin">ru_mor est</b> introduces and Indirect Statement.</p>',
				type: 'noun 3',
				specialSyntax: null
			}),
			fas: new Word({
				statement: 'fa_s, n.',
				definition: '(what is divinely) right; (what is) permitted',
				notes: '',
				type: 'noun indeclinable',
				specialSyntax: null
			}),
			nefas: new Word({
				statement: 'nefa_s, n.',
				definition: '(what is divinely) forbidden; sacrilege',
				notes: '',
				type: 'noun indeclinable',
				specialSyntax: null
			}),

		},

		verbs: {

		// LTRL Ch.2
			ambulo: new Word({
				statement: 'ambulo_, ambula_re, ambula_vi_, ambula_tum',
				definition: 'walk',
				notes: null,
				type: 'verb 1I',
				specialSyntax: null
			}),
			amo: new Word({
				statement: 'amo_, ama_re, ama_vi_, ama_tus',
				definition: 'love',
				notes: null,
				type: 'verb 1T',
				specialSyntax: null
			}),
			cogito: new Word({
				statement: 'co_gito_, co_gita_re, cogita_vi_, co_gita_tus',
				definition: 'think; ponder',
				notes: '<p> May take a direct object, e.g. <span class="Latin">'+_('Animam co_gitat.')+'</span> - <i>She is pondering the soul.</i>, or be used with the preposition <span class="Latin">'+_('de_')+'</span>: <span class="Latin">'+_('De_ anima_ co_gitat.')+'</span> - <i>She is thinking about the soul.</i></p>',
				type: 'verb 1T',
				specialSyntax: null
			}),
			do: new Word({
				statement: 'do_, dare, dedi_, datus',
				definition: 'give, grant',
				notes: '<p>Like all verbs of giving, showing, and telling, <span class="Latin">'+_('do_')+'</span> regularly takes both a direct and indirect object.</p>',
				type: 'verb 1T',
				specialSyntax: {
					indicative: {
						active: {
							present: {
								singular: {
									second: _('da_s')
								}
							}
						}
					},
					imperative: {
						active: {
							present: {
								singular:{
									second: _('da_')
								}
							}
						}
					}
				}
			}),
			dono: new Word({
				statement: 'do_no_, do_na_re, do_na_vi_, do_na_tus',
				definition: 'give; present, reward',
				notes: '<p>'
							+ 'A <i>denominative verb</i> - (derived from nouns or adjectives), <span class="Latin">'+_('do_no_')+'</span> is derived from the noun <span class="Latin">'+_('do_num')+'</span>.'
							+ '<br>Like all verbs of giving, showing, and teling, it regularly takes a direct object and indrect object, e.g. <span class="Latin">'+_('Poe_tae pecu_niam do_na_mus')+'</span> - <i>We are giving money to the poet.</i> In this case, <span class="Latin">'+_('do_no_')+'</span> is a synonym of <span class="Latin">'+_('do_')+'</span>.'
							+ '<br>When it means "present" or "reward", it takes a direct object or an Ablative of Means, e.g. <span class="Latin">'+_('Poe_tam pecu_nia_ do_na_mus.')+'</span> - <i> We are rewarding the poet with (by means of) money.</i>'
							+ '</p>',
				type: 'verb 1T',
				specialSyntax: null
			}),
			erro: new Word({
				statement: 'erro_, erra_re, erra_vi_, erra_tum',
				definition: 'wander; err, make a mistake',
				notes: null,
				type: 'verb 1I',
				specialSyntax: null
			}),
			laboro: new Word({
				statement: 'labo_ro_, labo_ra_re, labo_ra_vi_, labo_ra_tum',
				definition: 'work; suffer, be distressed',
				notes: null,
				type: 'verb 1I',
				specialSyntax:null
			}),
			monstro: new Word({
				statement: 'mo_nstro_, mo_nstra_re, mo_nstra_vi_, mo_nstra_tus',
				definition: 'show, point out',
				notes: '<p>Like all verbs of giving, showing, and telling, <span class="Latin">'+_('mo_nstro_')+'</span> regularly takes both a direct and indirect object.</p>',
				type: 'verb 1T',
				specialSyntax: null
			}),
			opto: new Word({
				statement: 'opto_, opta_re, opta_vi_, opta_tus',
				definition: 'desire; choose',
				notes: '<p>May take an Object Infinitive. When it means "choose", it sometimes has <span class="Latin">'+_('e_ / ex')+'</span> + ablative to express the group out from which something or someone is chosen, e.g. <span class="Latin">'+_('Poe_tam e_ viri_s i_nsulae opta_bimus.')+'</span> - <i>We shall choose a poet (out) from the men of the island.</i></p>',
				type: 'verb 1T',
				specialSyntax: null
			}),
			voco: new Word({
				statement: 'voco_, voca_re, voca_vi_, voca_tus',
				definition: 'call; summon; name',
				notes: '<p>Means "call" both in the sense of "summon" and in the sense of "name". In the latter case, it regularly takes a direct object and another noun called a <b>Predicate Accusative</b>, e.g. <span class="Latin">'+_('Patriam i_nsulam voco_.')+'</span> - <i>I call the island (d.o.) (my) homeland (Predicate Accusative).</i></p>',
				type: 'verb 1T',
				specialSyntax: null
			}),
			debeo: new Word({
				statement: 'de_beo_, de_be_re, de_bui_, de_bitus',
				definition: 'owe; ought',
				notes: '<p>'
							 + 'When taking a direct object, should be translated "owe". When followed by a Complementary Infinitive, should be translated "ought".'
							 + '</p>',
				type: 'verb 2',
				specialSyntax: null
			}),
			habeo: new Word({
				statement: 'habeo_, habe_re, habui_, habitus',
				definition: 'have, hold; consider',
				notes: '<p>Frequently takes an Object Infinitive, most often with a subject of the infinitive in the accusative case, which should be translated as if it were a direct object of <span class="Latin">'+_('iubeo_')+'</span>, e.g. <span class="Latin>'+_('Re_gi_na nautam labo_ra_re iubet.')+'</span> - <i>The queen orders the sailor to work.</i></p>',
				type: 'verb 2',
				specialSyntax: null
			}),
			iubeo: new Word({
				statement: 'iubeo_, iube_re, iussi_, iussus',
				definition: 'order',
				notes: null,
				type: 'verb 2',
				specialSyntax: null
			}),
			moveo: new Word({
				statement: 'moveo_, move_re, mo_vi_, mo_tus',
				definition: 'set in motion, stir (up), move',
				notes: '<p>Means "set in motion" either physically or emotionally.</p>',
				type: 'verb 2',
				specialSyntax: null
			}),
			respondeo: new Word({
				statement: 'respondeo_, responde_re, respondi_, respo_nsus',
				definition: 'answer, reply, respond',
				notes: null,
				type: 'verb 2',
				specialSyntax: null
			}),
			timeo: new Word({
				statement: 'timeo_, time_re, timui_, -',
				definition: 'fear, be afraid (of)',
				notes: '<p>'
							+ 'Transitive but may be used absolutely. May be accompanied by a Dative of Reference or by the preposition <span class="Latin">'+_('de_')+'</span> (as well as by other prepositions).'
							+ '<br>Example: <span class="Latin">Agricola timet.</span> - <i>The farmer is afraid (used absolutely).</i>'
							+ '<br>Example: <span class="Latin">'+_('Agricola re_gi_nam timet.')+'</span> - <i>The farmer fears the queen (transitive).</i>'
							+ '<br>Example: <span class="Latin">'+_('Agricola re_gi_nae timet.')+'</span> - <i>The farmer fears for the queen (with dative).</i>'
							+ '<br>Example: <span class="Latin">'+_('Agricola de_ fi_lio_ timet.')+'</span> - <i>The farmer is afraid about (his) son. (with <span class="Latin">'+_('de_')+'</span> + ablative).</i>'
							+ '</p>',
				type: 'verb 2',
				specialSyntax: {
					indicative: {
						passive: {
							perfect: {
								singular: {
									first: '-',
									second: '-',
									third: '-'
								},
								plural: {
									first: '-',
									second: '-',
									third: '-'
								}
							},
							pluperfect: {
								singular: {
									first: '-',
									second: '-',
									third: '-'
								},
								plural: {
									first: '-',
									second: '-',
									third: '-'
								}
							},
							futureperfect: {
								singular: {
									first: '-',
									second: '-',
									third: '-'
								},
								plural: {
									first: '-',
									second: '-',
									third: '-'
								}
							}
						}
					}
				}
			}),
			video: new Word({
				statement: 'video_, vide_re, vi_di_, vi_sus',
				definition: 'see; (passive) be seen; (passive) seem',
				notes: '<p>'
								+ 'When <span class="Latin">' + _('video_') + '</span> means "be seen", it is often accompanied by an Ablative of Personal Agent, e.g. <span class="Latin">' + _('Poe_ta a_ re_gi_na_ vide_tur.') + '</span> - <i>The poet is (being) seen by the queen.</i>'
								+ '<br>When <span class="Latin">' + _('video_') + '</span> means "seem" (i.e. be seen as), it functions as a copulative verb with a Predicate Nominative or Predicate Adjective in the nominative case. It may also be accompanied by a Complementary Infinitive, a Dative of Reference, or both. e.g. <span class="Latin">' + _('Miser re_gi_nae poe_ta (esse) vide_tur.') + '</span> - <i> The poet seems to the queen (to be) wretched.'
								+ '</p>',
				type: 'verb 2',
				specialSyntax: null
			}),
			sum: new Word({
				statement: 'sum, esse, fui_, futu_rus',
				definition: 'be; exist',
				notes: '<p>'
								+ '<span class="Latin">sum</span> is an intransitive verb. It may function as a copulative verb, equating the subject with a predicate nominative, and usually found between them, e.g. <span class="Latin">'+_('Re_gi_na est fi_lia deae.')+'</span> - <i>The queen is the daughter of a goddess</i>. It may also assert the existence of the subject, in which case it often (but not always) precedes the subject, e.g. <span class="Latin">'+_('Est re_gi_na in i_nsula_.')+'</span> - <i>There is a queen on the island</i>.'
								+ '<br><span class="Latin">' + _('futu_rus') + '</span> (<i>about to be</i>) is the future active participle.'
								+'</p>',
				type: 'verb Irr',
				specialSyntax: {
					indicative: {
						active: {
							present: {
								singular: {
									first:  'sum',
									second: 'es',
									third:  'est'
								},
								plural: {
									first:  'sumus',
									second: 'estis',
									third:  'sunt'
								}
							},
							perfect: {
								singular: {
									first:  _('fui_'),
									second: _('fuisti_'),
									third:  'fuit'
								},
								plural: {
									first:  'fuimus',
									second: 'fuistis',
									third:  _('fue_runt / fue_re')
								}
							},
							imperfect: {
								singular: {
									first:  'eram',
									second: _('era_s'),
									third:  'erat'
								},
								plural: {
									first:  _('era_mus'),
									second: _('era_tis'),
									third:  _('erant')
								}
							},
							pluperfect: {
								singular: {
									first:  'fueram',
									second: _('fuera_'),
									third:  'fuerat'
								},
								plural: {
									first:  _('fuera_mus'),
									second: _('fuera_tis'),
									third:  'fuerant'
								}
							},
							future: {
								singular: {
									first:  _('ero_'),
									second: 'eris',
									third:  'erit'
								},
								plural: {
									first:  'erimus',
									second: 'eritis',
									third:  'erunt'
								}
							},
							futureperfect: {
								singular: {
									first:  _('fuero_'),
									second: 'fueris',
									third:  'fuerit'
								},
								plural: {
									first:  'fuerimus',
									second: 'fueritis',
									third:  'fuerint'
								}
							}
						},
						passive: {
							present: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							perfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							imperfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							pluperfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							future: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							futureperfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first: 	'-',
									second: '-',
									third:  '-'
								}
							}
						}
					},
					imperative: {
						active: {
							present: {
								singular: {
									second: 'es'
								},
								plural: {
									second: 'este'
								}
							}
						},
						passive: {
							present: {
								singular: {
									second: '-'
								},
								plural: {
									second: '-'
								}
							}
						}
					},
					subjunctive: {
						active: {
							present: {
								singular: {
									first:  'sim',
									second: _('si_s'),
									third:  'sit'
								},
								plural: {
									first:  _('si_mus'),
									second: _('si_tis'),
									third:  'sint'
								}
							},
							imperfect: {
								singular: {
									first:  'essem',
									second: _('esse_s'),
									third:  'esset'
								},
								plural: {
									first:  _('esse_mus'),
									second: _('esse_tis'),
									third:  'essent'
								}
							},
							perfect: {
								singular: {
									first:  'fuerim',
									second: 'fueris',
									third:  'fuerit'
								},
								plural: {
									first:  'fuerimus',
									second: 'fueritis',
									third:  'fuerint'
								}
							},
							pluperfect: {
								singular: {
									first:  'fuissem',
									second: _('fuisse_s'),
									third:  'fuisset'
								},
								plural: {
									first:  _('fuisse_mus'),
									second: _('fuisse_tis'),
									third:  'fuissent'
								}
							}
						},
						passive: {
							present: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							imperfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							perfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							pluperfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							}
						}
					},
					infinitive: {
						active: {
							present: 'esse'
						},
						passive: {
							present: '-'
						}
					},
					participle: {
						active: {
							present: '-',
							perfect: '-',
							future:   _('futu_rus')
						},
						passive: {
							present: '-',
							perfect: '-',
							future:  '-'
						}
					}
				}
			}),
			possum: new Word({
				statement: 'possum, posse, potui_, -',
				definition: 'be able, can',
				notes: '<p>'
								+ '<span class="Latin">possum</span> is an intransitive verb, regularly followed by a <i>Complementary Infinitive</i>.'
								+ '</p>',
				type: 'verb Irr',
				specialSyntax: {
					indicative: {
						active: {
							present: {
								singular: {
									first:  'possum',
									second: 'potes',
									third:  'potest'
								},
								plural: {
									first:  'possumus',
									second: 'potestis',
									third:  'possunt'
								}
							},
							perfect: {
								singular: {
									first:  _('potui_'),
									second: _('potuisti_'),
									third:  'potuit'
								},
								plural: {
									first:  'potuimus',
									second: 'potuistis',
									third:  _('potue_runt / potue_re')
								}
							},
							imperfect: {
								singular: {
									first:  'poteram',
									second: _('potera_s'),
									third:  'poterat'
								},
								plural: {
									first:  _('potera_mus'),
									second: _('potera_tis'),
									third:  'poterant'
								}
							},
							pluperfect: {
								singular: {
									first:  'potueram',
									second: _('potuera_s'),
									third:  'potuerat'
								},
								plural: {
									first:  _('potuera_mus'),
									second: _('potuera_tis'),
									third:  'potuerant'
								}
							},
							future: {
								singular: {
									first:  _('potero_'),
									second: 'poteris',
									third:  'poterit'
								},
								plural: {
									first:  'poterimus',
									second: 'poteritis',
									third:  'poterunt'
								}
							},
							futureperfect: {
								singular: {
									first:  _('potuero_'),
									second: 'potueris',
									third:  'potuerit'
								},
								plural: {
									first:  'potuerimus',
									second: 'potueritis',
									third:  'potuerint'
								}
							}
						},
						passive: {
							present: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							perfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							imperfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							pluperfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							future: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							futureperfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first: 	'-',
									second: '-',
									third:  '-'
								}
							}
						}
					},
					imperative: {
						active: {
							present: {
								singular: {
									second: '-'
								},
								plural: {
									second: '-'
								}
							}
						},
						passive: {
							present: {
								singular: {
									second: '-'
								},
								plural: {
									second: '-'
								}
							}
						}
					},
					subjunctive: {
						active: {
							present: {
								singular: {
									first:  'possim',
									second: _('possi_s'),
									third:  'possit'
								},
								plural: {
									first:  _('possi_mus'),
									second: _('possi_tis'),
									third:  'possint'
								}
							},
							imperfect: {
								singular: {
									first:  'possem',
									second: _('posse_s'),
									third:  'posset'
								},
								plural: {
									first:  _('posse_mus'),
									second: _('posse_tis'),
									third:  'possent'
								}
							},
							perfect: {
								singular: {
									first:  'potuerim',
									second: 'potueris',
									third:  'potuerit'
								},
								plural: {
									first:  'potuerimus',
									second: 'potueritis',
									third:  'potuerint'
								}
							},
							pluperfect: {
								singular: {
									first:  'potuissem',
									second: _('potuisse_s'),
									third:  'potuisset'
								},
								plural: {
									first:  _('potuisse_mus'),
									second: _('potuisse_tis'),
									third:  'potuissent'
								}
							}
						},
						passive: {
							present: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							imperfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							perfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							pluperfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							}
						}
					},
					infinitive: {
						active: {
							present: 'posse'
						},
						passive: {
							present: '-'
						}
					},
					participle: {
						active: {
							present: '-',
							perfect: '-',
							future:  '-'
						},
						passive: {
							present: '-',
							perfect: '-',
							future:  '-'
						}
					}
				}
			}),

			// // Wheelock Ch. 1
				// coniugo: new Word({
				// 	statement: 'coniugo_, coniuga_re, coniuga_vi_, coniuga_tus',
				// 	definition: 'conjugate; join together, unite',
				// 	notes: null,
				// 	type: 'verb 1T',
				// 	specialSyntax: null
				// }),
				// laudo: new Word({
				// 	statement: 'laudo_, lauda_re, lauda_vi_, lauda_tus',
				// 	definition: 'praise',
				// 	notes: null,
				// 	type: 'verb 1T',
				// 	specialSyntax: null
				// }),
				// moneo: new Word({
				// 	statement: 'moneo_, mone_re, monui_, monitus',
				// 	definition: 'remind, advise, warn',
				// 	notes: null,
				// 	type: 'verb 2',
				// 	specialSyntax: null
				// }),
				// salveo: new Word({
				// 	statement: 'salveo_, salve_re, -, -',
				// 	definition: 'be well, be in good health',
				// 	notes: null,
				// 	type: 'verb 2',
				// 	specialSyntax: null
				// }),
				// servo: new Word({
				// 	statement: 'servo_, serva_re, serva_vi_, serva_tus',
				// 	definition: 'preserve, save, keep, guard',
				// 	notes: null,
				// 	type: 'verb 1T',
				// 	specialSyntax: null
				// }),
				// conservo: new Word({
				// 	statement: 'conservo_, conserva_re, conserva_vi_, conserva_tus',
				// 	definition: 'preserve, conserve, maintain',
				// 	notes: '<p>A stronger form of <span class="Latin">'+ _('servo_') + '</span>: <span class="Latin">con</span> + <span class="Latin">'+ _('servo_') + '</span></p>',
				// 	type: 'verb 1T',
				// 	specialSyntax: null
				// }),
				// terreo: new Word({
				// 	statement: 'terreo_, terre_re, terrui_, territus',
				// 	definition: 'frighten, terrify',
				// 	notes: null,
				// 	type: 'verb 2',
				// 	specialSyntax: null
				// }),
				// valeo: new Word({
				// 	statement: 'valeo_, vale_re, valui_,  valitu_rus',
				// 	definition: 'be strong, have power; be well',
				// 	notes: null,
				// 	type: 'verb 2',
				// 	specialSyntax: null
				// }),
				// festino: new Word({
				// 	statement: 'festi_no_, festi_na_re, festi_na_vi_, festi_na_tum',
				// 	definition: 'hasten, make haste',
				// 	notes: null,
				// 	type: 'verb 1I',
				// 	specialSyntax: null
				// }),
				// culpo: new Word({
				// 	statement: 'culpo_, culpa_re, culpa_vi_, culpa_tus',
				// 	definition: 'blame, censure',
				// 	notes: null,
				// 	type: 'verb 1T',
				// 	specialSyntax: null
				// }),
				// pecco: new Word({
				// 	statement: 'pecco_, pecca_re, pecca_vi_, pecca_tum',
				// 	definition: 'sin, transgress',
				// 	notes: null,
				// 	type: 'verb 1I',
				// 	specialSyntax: null
				// }),
				// volo: new Word({
				// 	statement: 'volo_, vola_re, vola_vi_, vola_tum',
				// 	definition: 'fly',
				// 	notes: null,
				// 	type: 'verb 1I',
				// 	specialSyntax: null
				// }),

		// LTRL Ch.3
			pugno: new Word({
				statement: 'pugno_, pugna_re, pugna_vi_, pugna_tum',
				definition: 'fight',
				notes: '<p>Often takes an Ablative of Accompaniment that indicates the person <i>against</i> whom one is fighting.'
							+ '<br><u>Ex.</u> <b class="Latin">Nautae cum agricoli_s pugnant.</b> - <i>The sailors are fighting with the farmers.</i>'
							+ '</p>',
				type: 'verb 1I',
				specialSyntax: null
			}),
			supero: new Word({
				statement: 'supero_, supera_re, supera_vi_, supera_tus',
				definition: 'overcome, conquer, surpass',
				notes: null,
				type: 'verb 1T',
				specialSyntax: null
			}),
			eo: new Word({
				statement: 'eo_, i_re, ii_ / i_vi_, itum',
				definition: 'go',
				notes: null,
				type: 'verb Irr',
				specialSyntax: {
					indicative: {
						active: {
							present: {
								singular: {
									first:  _('eo_'),
									second: _('i_s'),
									third:  'it'
								},
								plural: {
									first:  _('i_mus'),
									second: _('i_tis'),
									third:  'eunt'
								}
							},
							perfect: {
								singular: {
									first:  _('ii_ / i_vi_'),
									second: _('i_sti_ / i_visti_'),
									third:  _('iit / i_t / i_vit')
								},
								plural: {
									first:  _('iimus / i_mus / i_vimus'),
									second: _('i_stis / i_vistis'),
									third:  _('ie_runt / ie_re / i_ve_runt / i_ve_re')
								}
							},
							imperfect: {
								singular: {
									first:  _('i_bam'),
									second: _('i_ba_s'),
									third:  _('i_bat')
								},
								plural: {
									first:  _('i_ba_mus'),
									second: _('i_ba_tis'),
									third:  _('i_bant')
								}
							},
							pluperfect: {
								singular: {
									first:  _('ieram / i_veram'),
									second: _('iera_s / i_vera_s'),
									third:  _('ierat / i_verat')
								},
								plural: {
									first:  _('iera_mus / i_vera_mus'),
									second: _('iera_tis / i_vera_tis'),
									third:  _('ierant / i_verant')
								}
							},
							future: {
								singular: {
									first:  _('i_bo_'),
									second: _('i_bis'),
									third:  _('i_bit')
								},
								plural: {
									first:  _('i_bimus'),
									second: _('i_bitis'),
									third:  _('i_bunt')
								}
							},
							futureperfect: {
								singular: {
									first:  _('iero_ / i_vero_'),
									second: _('ieris / i_veris'),
									third:  _('ierit / i_verit')
								},
								plural: {
									first:  _('ierimus / i_verimus'),
									second: _('ieritis / i_veritis'),
									third:  _('ierint / i_verint')
								}
							}
						},
						passive: {
							present: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							perfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							imperfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							pluperfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							future: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							futureperfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first: 	'-',
									second: '-',
									third:  '-'
								}
							}
						}
					},
					imperative: {
						active: {
							present: {
								singular: {
									second: _('i_')
								},
								plural: {
									second: _('i_te')
								}
							}
						},
						passive: {
							present: {
								singular: {
									second: '-'
								},
								plural: {
									second: '-'
								}
							}
						}
					},
					subjunctive: {
						active: {
							present: {
								singular: {
									first:  'eam',
									second: _('ea_s'),
									third:  'eat'
								},
								plural: {
									first:  _('ea_mus'),
									second: _('ea_tis'),
									third:  'eant'
								}
							},
							imperfect: {
								singular: {
									first:  _('i_rem'),
									second: _('i_re_s'),
									third:  _('i_ret')
								},
								plural: {
									first:  _('i_re_mus'),
									second: _('i_re_tis'),
									third:  _('i_rent')
								}
							},
							perfect: {
								singular: {
									first:  _('ierim / i_verim'),
									second: _('ieris / i_veris'),
									third:  _('ierit / i_verit')
								},
								plural: {
									first:  _('ierimus / i_verimus'),
									second: _('ieritis / i_veritis'),
									third:  _('ierint / i_verint')
								}
							},
							pluperfect: {
								singular: {
									first:  _('i_ssem / i_vissem'),
									second: _('i_sse_s / i_visse_s'),
									third:  _('i_sset / i_visset')
								},
								plural: {
									first:  _('i_sse_mus / i_visse_mus'),
									second: _('i_sse_tis / i_visse_tis'),
									third:  _('i_ssent / i_vissent')
								}
							}
						},
						passive: {
							present: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							imperfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							perfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							pluperfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							}
						}
					},
					infinitive: {
						active: {
							present: _('i_re')
						},
						passive: {
							present: '-'
						}
					},
					participle: {
						active: {
							present: _('ie_ns, euntis'),
							perfect: '-',
							future:  _('itu_rus, -a, -um')
						},
						passive: {
							present: '-',
							perfect: 'itus, -a, -um',
							future:  'eundum'
						},
					}
				}
			}),
			teneo: new Word({
				statement: 'teneo_, tene_re, tenui_, tentus',
				definition: 'hold, grasp; keep, possess; occupy',
				notes: '<p>'
								+ 'May mean "hold" something in one\'s hands or "grasp" something with one\'s intellect. Has accessory idea of maintaining possession of something once held or grasped. May also mean "occupy" in the sense of holding to one\'s place of habitation.'
								+ '</p>',
				type: 'verb 2',
				specialSyntax: null
			}),
			ignosco: new Word({
				statement: 'igno_sco_, igno_scere, igno_vi_, igno_tus',
				definition: 'forgive, pardon',
				notes: null,
				type: 'verb 3',
				specialSyntax: null
			}),
			conicio: new Word({
				statement: 'conicio_, conicere, conie_ci_, coniectus',
				definition: 'throw together',
				notes: '<p>Pronounced as if spelled <b class="Latin">coniicio_, coniicere</b>.</p>',
				type: 'verb 3',
				specialSyntax: null
			}),
			apto: new Word({
				statement: 'apto_, apta_re, apta_vi_, apta_tus',
				definition: 'fit, put on',
				notes: null,
				type: 'verb 1T',
				specialSyntax: null
			}),
			recipero: new Word({
				statement: 'recipero_, recipera_re, recipera_vi_, recipera_tus',
				definition: 'get back, recover, regain',
				notes: null,
				type: 'verb 1T',
				specialSyntax: null
			}),

		// LTRL Ch.4
			ago: new Word({
				statement: 'ago_, agere, e_gi_, a_ctus',
				definition: 'drive; do; spend, conduct',
				notes: '<p>'
							 + 'Desribes action generally, its particular meanings being derived from context and the direct objects accompanying the verb. May mean "drive" (cattle, goats, plunder, a chariot, the winds); "do," "act," "manage," "plead" (a court case); or "spend," "conduct" (time, life).'
							 + '<br>The present active imperative is often used to strengthen other commands, e.g.'
							 + '<br>Ex. <b class="Latin"><u>Age</u>, do_na_ puelli_s do_na!</b> - <i><u>Come on</u>, give gifts to the girls!</i>'
							 + '</p>',
				type: 'verb 3',
				specialSyntax: null
			}),
			cano: new Word({
				statement: 'cano_, canere, cecini_, cantus',
				definition: 'sing (of)',
				notes: '<p>'
								+ 'A transitive verb that takes a direct object. e.g. <span class="Latin">' + _('Poe_ta bellum cane_bat.') + '</span> - <i> The poet was singing of war.</i>'
								+ '</p>',
				type: 'verb 3',
				specialSyntax: null
			}),
			capio: new Word({
				statement: 'capio_, capere, ce_pi_, captus',
				definition: 'take (up), capture; win',
				notes: null,
				type: 'verb 3i',
				specialSyntax: null
			}),
			dico: new Word({
				statement: 'di_co_, di_cere, di_xi_, dictus',
				definition: 'say, speak, tell',
				notes: null,
				type: 'verb 3',
				specialSyntax: {
					imperative: {
						active: {
							present: {
								singular: {
									second: _('di_c')
								}
							}
						}
					}
				}
			}),
			duco: new Word({
				statement: 'du_co_, du_cere, du_xi_, ductus',
				definition: 'lead; consider',
				notes: null,
				type: 'verb 3',
				specialSyntax: {
					imperative: {
						active: {
							present: {
								singular: {
									second: _('du_c')
								}
							}
						}
					}
				}
			}),
			facio: new Word({
				statement: 'facio_, facere, fe_ci_, factus',
				definition: 'make; do',
				notes: '<p>"Make" includes ideas of <i>creating</i>, <i>causing</i>, or <i>representing</i> something. "Do" means <i>perform</i> or <i>carry out</i> an action, deed, crime, orders, etc.</p>',
				type: 'verb 3i',
				specialSyntax: {
					imperative: {
						active: {
							present: {
								singular: {
									second: _('fac')
								}
							}
						}
					}
				}
			}),
			gero: new Word({
				statement: 'gero_, gerere, gessi_, gestus',
				definition: 'bear; manage, conduct; perform',
				notes: '<p>'
								+ 'Has three distinct senses: 1. "bear" or "carry" (equipment, clothing); 2. "have" or "bear" as a permament or temporary feature of body or mind (wounds, reputation, anger); and 3. "manage," "conduct," or "perform" (oneself, business, political office).'
								+ '</p>',
				type: 'verb 3',
				specialSyntax: null
			}),
			mitto: new Word({
				statement: 'mitto_, mittere, mi_si_, missus',
				definition: 'send',
				notes: '<p>'
								+ 'Regularly found with two constructions indicating the recipient: <span class="Latin">ad</span> + accusative or a Dative of Reference.'
								+ '<br>Example: <span class="Latin">' + _('Agricola ad fi_lium pecu_niam mittit.') + '</span> - <i>The farmer sends money to his son.</i>'
								+ '<br>Example: <span class="Latin">' + _('Agricola fi_lio_ pecu_niam mittit.') + '</span> - <i>The farmer sends money to his son.</i>'
								+ '<br>In the first case, emphasizes <i>motion toward</i> someone or something. In the second case, emphasizes the <i>person for whom</i> something is meant.'
								+ '</p>',
				type: 'verb 3',
				specialSyntax: null
			}),
			pono: new Word({
				statement: 'po_no_, po_nere, posui_, positus',
				definition: 'put, place; set aside',
				notes: '<p>'
								+ 'Has two distinct meanings.'
								+ '<br>Example: <span class="Latin">' + _('Incolae arma in oppido_ po_nunt.') +'</span> - <i>The inhabitants are placing weapons in the town.</i>'
								+ '<br>Example: <span class="Latin">' + _('Incolae arma po_nunt.') + '</span> - <i>The inhabitants are setting aside (their) weapons.</i>'
								+ '</p>',
				type: 'verb 3',
				specialSyntax: null
			}),
			rego: new Word({
				statement: 'rego_, regere, re_xi_, re_ctus',
				definition: 'rule, control',
				notes: null,
				type: 'verb 3',
				specialSyntax: null
			}),
			scribo: new Word({
				statement: 'scri_bo_, scri_bere, scri_psi_, scri_ptus',
				definition: 'write',
				notes: null,
				type: 'verb 3',
				specialSyntax: null
			}),
			audio: new Word({
				statement: 'audio_, audi_re, audi_vi_, audi_tus',
				definition: 'hear, listen (to)',
				notes: '<p>'
								+ 'A transitive verb that may be used absolutely. When it takes a direct object, it is translated "hear" or "listen to". When used absolutely, translated "hear" or "listen."'
								+ '<br>Example: <span class="Latin">' + _('Re_gi_na incola_s audit.') + '</span> - <i>The queen listens to / hears the inhabitants.</i>'
								+ '<br>Example: <span class="Latin">' + _('Re_gi_na audit') + '</span> - <i>The queen listens / hears.</i>'
								+ '</p>',
				type: 'verb 4',
				specialSyntax: null
			}),
			sentio: new Word({
				statement: 'sentio_, senti_re, se_nsi_, se_nsus',
				definition: 'perceive; feel',
				notes: '<p>'
								+ 'Note that <span class="Latin"> -ns </span> <i>always</i> lengthens a preceding vowel (e.g. <span class="Latin">' + _('i_nsula') + '</span>'
								+ '<br>The basic meaning is "perceive through one of the senses". Thus it has an intellectual sense (perceive, observe, notice) and a more physical or emotional sense (experience, feel, suffer).'
								+ '</p>',
				type: 'verb 4',
				specialSyntax: null
			}),
			venio: new Word({
				statement: 'venio_, veni_re, ve_ni_, ventum',
				definition: 'come',
				notes: '<p>(an <i>intransitive</i> verb)</p>',
				type: 'verb 4',
				specialSyntax: {
					indicative: {
						passive: {
							present: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							perfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							imperfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							pluperfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							future: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							futureperfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first: 	'-',
									second: '-',
									third:  '-'
								}
							}
						}
					},
					imperative: {
						passive: {
							present: {
								singular: '-',
								plural:   '-'
							}
						}
					},
					infinitive: {
						passive: {
							present: '-'
						}
					}
				}
			}),

		// LTRL Ch.5
			accipio: new Word({
				statement: 'accipio_, accipere, acce_pi_, acceptus',
				definition: 'receive; accept; hear (of), learn (of)',
				notes: '<p>Compound Verb: <b class="Latin">ad-</b> + <b class="Latin">capio_</b>.</p>',
				type: 'verb 3i',
				specialSyntax: null
			}),
			cedo: new Word({
				statement: 'ce_do_, ce_dere, cessi_, cessum',
				definition: 'go, move; yield; withdraw',
				notes: null,
				type: 'verb 3',
				specialSyntax: null
			}),
			accedo: new Word({
				statement: 'acce_do_, acce_dere, accessi_, accessum',
				definition: 'go or come to, approach',
				notes: '<p>Compound Verb: <b class="Latin">ad-</b> + <b class="Latin">ce_do_</b>. Most often intransitive, and regularly followed by <b class="Latin">ad-</b> + accusative, where the preposition <b class="Latin">ad</b> repeats the prefix <b class="Latin">ad-</b> and often cannot be translated.'
							+'<br><u>Ex.</u> <b class="Latin">Auxilia ad oppidum acce_de_bant.</b> - <i>The auxiliary troops were approaching (toward) the town.</i>'
							+'</p>',
				type: 'verb 3',
				specialSyntax: null
			}),
			discedo: new Word({
				statement: 'disce_do_, disce_dere, discessi_, discessum',
				definition: 'go away, depart',
				notes: '<p>Compound Verb: <b class="Latin">dis-</b> + <b class="Latin">ce_do_</b>. An intransitive verb.</p>',
				type: 'verb 3',
				specialSyntax: null
			}),
			interficio: new Word({
				statement: 'interficio_, interficere, interfe_ci_, interfectus',
				definition: 'kill',
				notes: '<p>Compound Verb: <b class="Latin">inter-</b> + <b class="Latin">facio_</b>.</p>',
				type: 'verb 3i',
				specialSyntax: null
			}),
			perficio: new Word({
				statement: 'perficio_, perficere, perfe_ci_, perfectus',
				definition: 'complete, accomplish',
				notes: '<p>Compound Verb: <b class="Latin">per-</b> + <b class="Latin">facio_</b>.</p>',
				type: 'verb 3i',
				specialSyntax: null
			}),
			abeo: new Word({
				statement: 'abeo_, abi_re, abii_, abitum',
				definition: 'go away',
				notes: '<p>Compound Verb: <b class="Latin">ab-</b> + <b class="Latin">eo_</b>. (Only <i>one</i> third principal part.)</p>',
				type: 'verb Irr',
				specialSyntax: {
					indicative: {
						active: {
							present: {
								singular: {
									first:  _('abeo_'),
									second: _('abi_s'),
									third:  'abit'
								},
								plural: {
									first:  _('abi_mus'),
									second: _('abi_tis'),
									third:  'abeunt'
								}
							},
							perfect: {
								singular: {
									first:  _('abii_'),
									second: _('abi_sti_'),
									third:  _('abiit')
								},
								plural: {
									first:  _('abiimus'),
									second: _('abi_stis'),
									third:  _('abie_runt')
								}
							},
							imperfect: {
								singular: {
									first:  _('abi_bam'),
									second: _('abi_ba_s'),
									third:  _('abi_bat')
								},
								plural: {
									first:  _('abi_ba_mus'),
									second: _('abi_ba_tis'),
									third:  _('abi_bant')
								}
							},
							pluperfect: {
								singular: {
									first:  _('abieram'),
									second: _('abiera_s'),
									third:  _('abierat')
								},
								plural: {
									first:  _('abiera_mus'),
									second: _('abiera_tis'),
									third:  _('abierant')
								}
							},
							future: {
								singular: {
									first:  _('abi_bo_'),
									second: _('abi_bis'),
									third:  _('abi_bit')
								},
								plural: {
									first:  _('abi_bimus'),
									second: _('abi_bitis'),
									third:  _('abi_bunt')
								}
							},
							futureperfect: {
								singular: {
									first:  _('abiero_'),
									second: _('abieris'),
									third:  _('abierit')
								},
								plural: {
									first:  _('abierimus'),
									second: _('abieritis'),
									third:  _('abierint')
								}
							}
						},
						passive: {
							present: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							perfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							imperfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							pluperfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							future: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							futureperfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first: 	'-',
									second: '-',
									third:  '-'
								}
							}
						}
					},
					imperative: {
						active: {
							present: {
								singular: _('abi_'),
								plural:   _('abi_te')
							}
						},
						passive: {
							present: {
								singular: '-',
								plural:   '-'
							}
						}
					},
					infinitive: {
						active: {
							present: _('abi_re')
						},
						passive: {
							present: '-'
						}
					}
				}
			}),
			fero: new Word({
				statement: 'fero_, ferre, tuli_, la_tus',
				definition: 'bring, bear, carry; endure',
				notes: '<p>May also mean "say", "report", particularly when a common story or a myth is being reported. When it takes a reflexive pronoun as a direct object, the combination may mean "proceed (quickly)," "go".'
								+'<br><u>Ex.</u> <b class="Latin">Auxilium viri_s pro_vinciae fero_.</b> - <i>I am brining aid to the men of the province.</i>'
								+'<br><u>Ex.</u> <b class="Latin">Multa mala tuli_.</b> - <i>I have endured many evil things.</i>'
								+'<br><u>Ex.</u> <b class="Latin">Me_ ad pro_vinciam fere_bam.</b> - <i>I was proceeding (quickly) to the province.</i>'
								+'</p>',
				type: 'verb 3',
				specialSyntax: {
					indicative: {
						active: {
							present: {
								singular: {
									second: 'fers',
									third:  'fert'
								},
								plural: {
									second: 'fertis'
								}
							}
						},
						passive: {
							present: {
								singular: {
									second: 'ferris / ferre',
									third:  'fertur'
								}
							}
						}
					},
					imperative: {
						active: {
							present: {
								singular: {
									second: 'fer'
								},
								plural:   {
									second: 'ferte'
								}
							}
						},
						passive: {
							present: {
								singular: {
									second: 'ferre'
								},
								// plural: {
								// 	second: 'ferte'
								// }
							}
						}
					},
					infinitive: {
						active: {
							present: 'ferre'
						},
						passive: {
							present: _('ferri_')
						}
					}
				}
			}),
			memini: new Word({
				statement: 'memini_, meminisse',
				definition: 'remember, be mindful (of)',
				notes: '<p>(A <i>defective verb</i> - Uses perfect active forms of the indicative with present active meaning.) Often takes an Objective Genitive, also called the <i>Genitive with Verbs of Remembering and Forgetting</i>.'
								+'<br><u>Ex.</u> <b class="Latin">Meministi_ne patriae?</b> - <i>Do you remember your homeland? (Objective Genitive)</i>'
								+'<br><u>Ex.</u> <b class="Latin">Id memineram.</b> - <i>I was remembering it. (Accusative, Direct Object)</i>'
								+'<br>Uses future active forms of the imperative with present active meaning.'
								+'</p>',
				type: 'verb Def',
				specialSyntax: {
					imperative: {
						active: {
							present: {
								singular: {
									second: _('memento_'),
								},
								plural: {
									second: _('memento_te')
								}
							}
						},
					},
				}
			}),
			odi: new Word({
				statement: 'o_di_, o_disse',
				definition: 'hate',
				notes: '<p>(A <i>defective verb</i> - Uses perfect active forms of the indicative with present active meaning.)'
								+'<br>Has no imperative forms.'
								+'</p>',
				type: 'verb Def',
				specialSyntax: null
			}),
			redeo: new Word({
				statement: 'redeo_, redi_re, redii_, reditum',
				definition: 'go back, return',
				notes: '<p>Compound Verb: <b class="Latin">red-</b> + <b class="Latin">eo_</b>. (Only <i>one</i> third principal part.)</p>',
				type: 'verb Irr',
				specialSyntax: {
					indicative: {
						active: {
							present: {
								singular: {
									first:  _('redeo_'),
									second: _('redi_s'),
									third:  'redit'
								},
								plural: {
									first:  _('redi_mus'),
									second: _('redi_tis'),
									third:  'redeunt'
								}
							},
							perfect: {
								singular: {
									first:  _('redii_'),
									second: _('redi_sti_'),
									third:  _('rediit')
								},
								plural: {
									first:  _('rediimus'),
									second: _('redi_stis'),
									third:  _('redie_runt')
								}
							},
							imperfect: {
								singular: {
									first:  _('redi_bam'),
									second: _('redi_ba_s'),
									third:  _('redi_bat')
								},
								plural: {
									first:  _('redi_ba_mus'),
									second: _('redi_ba_tis'),
									third:  _('redi_bant')
								}
							},
							pluperfect: {
								singular: {
									first:  _('redieram'),
									second: _('rediera_s'),
									third:  _('redierat')
								},
								plural: {
									first:  _('rediera_mus'),
									second: _('rediera_tis'),
									third:  _('redierant')
								}
							},
							future: {
								singular: {
									first:  _('redi_bo_'),
									second: _('redi_bis'),
									third:  _('redi_bit')
								},
								plural: {
									first:  _('redi_bimus'),
									second: _('redi_bitis'),
									third:  _('redi_bunt')
								}
							},
							futureperfect: {
								singular: {
									first:  _('rediero_'),
									second: _('redieris'),
									third:  _('redierit')
								},
								plural: {
									first:  _('redierimus'),
									second: _('redieritis'),
									third:  _('redierint')
								}
							}
						},
						passive: {
							present: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							perfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							imperfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							pluperfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							future: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							futureperfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first: 	'-',
									second: '-',
									third:  '-'
								}
							}
						}
					},
					imperative: {
						active: {
							present: {
								singular: _('redi_'),
								plural:   _('redi_te')
							}
						},
						passive: {
							present: {
								singular: '-',
								plural:   '-'
							}
						}
					},
					infinitive: {
						active: {
							present: _('redi_re')
						},
						passive: {
							present: '-'
						}
					}
				}
			}),

 		// LTRL Ch.6
 			libero: new Word({
 				statement: 'li_bero_, li_bera_re, li_bera_vi_, libera_tus',
 				definition: 'free, liberate',
 				notes: '<p>Often accompanied by an Ablative of Separation.'
 								+'<br><u>Ex:</u> <b class="Latin">Incola_s peri_culo_ li_bera_vimus.</b> - <i>We freed the inhabitants from danger.</i>'
 								+'</p>',
 				type: 'verb 1T',
 				specialSyntax: null
 			}),
 			careo: new Word({
 				statement: 'careo_, care_re, carui_, caritu_rus',
 				definition: 'lack, be without, be free from (+ abl.)',
 				notes: '<p>Takes an Ablative of Separation that may be translated as a direct object in English.'
 								+ '<br><u>Ex:</u> <b>Agricola ami_ci_s no_n caret.</b> - <i>The farmer is not without (does not lack) friends.</i>'
 								+ '<br><u>Ex:</u> <b>Fi_lius re_gi_nae cu_ri_s caruit.</b> - <i>The son of the queen was free from cares.</i>'
 								+ '</p>',
 				type: 'verb 2',
 				specialSyntax: null
 			}),
 			lego: new Word({
 				statement: 'lego_, legere, le_gi_, le_ctus',
 				definition: 'gather; choose; read',
 				notes: '',
 				type: 'verb 3',
 				specialSyntax: null
 			}),
 			intellego: new Word({
 				statement: 'intellego_, intellegere, intelle_gi_, intelle_ctus',
 				definition: 'understand',
 				notes: '<p>Compound Verb: <b class="Latin">inter-</b> + <b class="Latin">lego_</b>.',
 				type: 'verb 3',
 				specialSyntax: null
 			}),
 			vivo: new Word({
 				statement: 'vi_vo_, vi_vere, vi_xi_, vi_ctu_rus',
 				definition: 'live, be alive',
 				notes: '(intransitive)',
 				type: 'verb 3',
 				specialSyntax: null
 			}),

 		// LTRL Ch.7
			maneo: new Word({
				statement: 'maneo_, mane_re, ma_nsi_, ma_nsu_rus',
				definition: 'remain, stay; await',
				notes: '<p>'
							+ 'With <b class="Latin">in</b> + ablative may mean "remain steady" or "abide (by)" (the truth, a conviction, a pact). Usually intransitive, but may be transitive - to "await" or "wait for" someone or something. Its compounds do <i>not</i> exhibit vowel weakening.'
							+'<br><u>Ex:</u> <b class="Latin">Ubi incolae discesse_runt, ma_nsimus.</b> - <i>When the inhabitants departed, we remained.</i>'
							+'<br><u>Ex:</u> <b class="Latin">Sulla semper in sententia_ ma_nsit.</b> - <i>Sulla always remained (steady) in (his) opinion.</i>'
							+'<br><u>Ex:</u> <b class="Latin">Fa_ta et bonum virum manent.</b> - <i>Death awaits even the good man.</i>'
							+'</p>',
				type: 'verb 2',
				specialSyntax: null
			}),
			terreo: new Word({
				statement: 'terreo_, terre_re, terrui_, territus',
				definition: 'terrify, frighten',
				notes: '<p>Compounds do <i>not</i> exhibit vowel weakening.</p>',
				type: 'verb 2',
				specialSyntax: null
			}),
			cupio: new Word({
				statement: 'cupio_, cupere, cupii_ / cupi_vi_, cupi_tus',
				definition: 'desire, long for, want',
				notes: '<p>While both <b class="Latin">cupio_</b> and <b class="Latin">opto_</b> mean "desire", <b class="Latin">cupio_</b> expresses a natural or involuntary desire, while <b class="Latin">opto_</b> suggests a more deliberate choice.</p>',
				type: 'verb 3i',
				specialSyntax: {
					indicative: {
						active: {
							perfect: {
								singular: {
									first:  _('cupii_ / cupi_vi_'),
									second: _('cupiisti_ / cupi_visti_'),
									third:  _('cupiit / cupi_vit')
								},
								plural: {
									first:  _('cupiimus / cupi_vimus'),
									second: _('cupiistis / cupi_vistis'),
									third:  _('cupie_runt / cupie_re / cupi_ve_runt / cupi_ve_re')
								}
							},
							pluperfect: {
								singular: {
									first:  _('cupieram / cupi_veram'),
									second: _('cupiera_s / cupi_vera_s'),
									third:  _('cupierat / cupi_verat')
								},
								plural: {
									first:  _('cupiera_mus / cupi_vera_mus'),
									second: _('cupiera_tis / cupi_vera_tis'),
									third:  _('cupierant / cupi_verant')
								}
							},
							futureperfect: {
								singular: {
									first:  _('cupiero_ / cupi_vero_'),
									second: _('cupieris / cupi_veris'),
									third:  _('cupierit / cupi_verit')
								},
								plural: {
									first:  _('cupierimus / cupi_verimus'),
									second: _('cupieritis / cupi_veritis'),
									third:  _('cupierint / cupi_verint')
								}
							}
						},
					},
					subjunctive: {
						active: {
							perfect: {
								singular: {
									first:  _('cupierim / cupi_verim'),
									second: _('cupieris / cupi_veris'),
									third:  _('cupierit / cupi_verit')
								},
								plural: {
									first:  _('cupierimus / cupi_verimus'),
									second: _('cupieritis / cupi_veritis'),
									third:  _('cupierint / cupi_verint')
								}
							},
							pluperfect: {
								singular: {
									first:  _('cupiissem / cupi_vissem'),
									second: _('cupiisse_s / cupi_visse_s'),
									third:  _('cupiisset / cupi_visset')
								},
								plural: {
									first:  _('cupiisse_mus / cupi_visse_mus'),
									second: _('cupiisse_tis / cupi_visse_tis'),
									third:  _('cupiissent / cupi_vissent')
								}
							}
						},
					}
				}
			}),
			fugio: new Word({
				statement: 'fugio_, fugere, fu_gi_, fugitu_rus',
				definition: 'flee',
				notes: '<p>Most often intransitive, but occasionally used transitively. Often used of a person going into exile. Its compounds do <i>not</i> exhibit vowel weakening.</p>',
				type: 'verb 3i',
				specialSyntax: null
			}),
			peto: new Word({
				statement: 'peto_, petere, petii_ / peti_vi_, peti_tus',
				definition: 'ask (for), seek; attack',
				notes: '<p>When meaning "ask (for)" or "seek", takes a direct object of the thing asked. The person from whom something is sought is expressed by <b class="Latin">a_ / ab</b> + ablative. When it means "attack," it takes a direct object of the person or thing atacked. Its compounds do <i>not</i> exhibit vowel weakening.'
							+'<br><u>Ex:</u> <b class="Latin">Servus pecu_niam a_ domino_ petit.</b> - <i>The slave asks for money from (his) master.</i>'
							+'<br><u>Ex:</u> <b class="Latin">Servus gladio_ dominum petit.</b> - <i>The slave attacks (his) master with a sword.</i>'
							+'</p>',
				type: 'verb 3',
				specialSyntax: {
					indicative: {
						active: {
							perfect: {
								singular: {
									first:  _('petii_ / peti_vi_'),
									second: _('petiisti_ / peti_visti_'),
									third:  _('petiit / peti_vit')
								},
								plural: {
									first:  _('petiimus / peti_vimus'),
									second: _('petiistis / peti_vistis'),
									third:  _('petie_runt / petie_re / peti_ve_runt / peti_ve_re')
								}
							},
							pluperfect: {
								singular: {
									first:  _('petieram / peti_veram'),
									second: _('petiera_s / peti_vera_s'),
									third:  _('petierat / peti_verat')
								},
								plural: {
									first:  _('petiera_mus / peti_vera_mus'),
									second: _('petiera_tis / peti_vera_tis'),
									third:  _('petierant / peti_verant')
								}
							},
							futureperfect: {
								singular: {
									first:  _('petiero_ / peti_vero_'),
									second: _('petieris / peti_veris'),
									third:  _('petierit / peti_verit')
								},
								plural: {
									first:  _('petierimus / peti_verimus'),
									second: _('petieritis / peti_veritis'),
									third:  _('petierint / peti_verint')
								}
							}
						},
					},
					subjunctive: {
						active: {
							perfect: {
								singular: {
									first:  _('petierim / peti_verim'),
									second: _('petieris / peti_veris'),
									third:  _('petierit / peti_verit')
								},
								plural: {
									first:  _('petierimus / peti_verimus'),
									second: _('petieritis / peti_veritis'),
									third:  _('petierint / peti_verint')
								}
							},
							pluperfect: {
								singular: {
									first:  _('petiissem / peti_vissem'),
									second: _('petiisse_s / peti_visse_s'),
									third:  _('petiisset / peti_visset')
								},
								plural: {
									first:  _('petiisse_mus / peti_visse_mus'),
									second: _('petiisse_tis / peti_visse_tis'),
									third:  _('petiissent / peti_vissent')
								}
							}
						},
					}
				}
			}),
			trado: new Word({
				statement: 'tra_do_, tra_dere, tra_didi_, tra_ditus',
				definition: 'hand over, surrender; hand down',
				notes: '<p>A compound verb formed by the addition of the prefix <b class="Latin">tra_ns-</b> (<i>across</i>) to <b class="Latin">do_</b>. It exhibits regular vowel weakening in the third and fourth principal parts. Means "hand down" in the sense of transmitting something to posterity or relating a story.</p>',
				type: 'verb 3',
				specialSyntax: {
					indicative: {
						active: {
							present: {
								singular: {
									second: _('tra_da_s (?) tra_dis (?)')
								}
							}
						}
					},
					imperative: {
						active: {
							present: {
								singular: _('tra_da_ (?) tra_de (?_')
							}
						}
					}
				}
			}),
			vinco: new Word({
				statement: 'vinco_, vincere, vi_ci_, victus',
				definition: 'conquer, overcome; win',
				notes: '<p>Compounds do not exhibit vowel weakening.</p>',
				type: 'verb 3',
				specialSyntax: null
			}),
			aufero: new Word({
				statement: 'aufero_, auferre, abstuli_, abla_tus',
				definition: 'carry away, take away, remove',
				notes: '<p>A compound verb formed by the addition of the prefix <b class="Latin">ab-</b> to <b class="Latin">fero_</b>.</p>',
				type: 'verb 3',
				specialSyntax: {
					indicative: {
						active: {
							present: {
								singular: {
									second: 'aufers',
									third:  'aufert'
								},
								plural: {
									second: 'aufertis'
								}
							}
						},
						passive: {
							present: {
								singular: {
									second: 'auferris / auferre',
									third:  'aufertur'
								}
							}
						}
					},
					imperative: {
						active: {
							present: {
								singular: 'aufer',
								plural:   'auferte'
							}
						},
						passive: {
							present: {
								singular: 'auferre'
							}
						}
					},
					infinitive: {
						active: {
							present: 'auferre'
						},
						passive: {
							present: _('auferri_')
						}
					}
				}
			}),
			differo: new Word({
				statement: 'differo_, differre, distuli_, di_la_tus',
				definition: 'carry in different directions, scatter; postpone, defer; (intr.) differ, be different',
				notes: '<p>A compound verb formed by the addition of the prefix <b class="Latin">dis-</b> to <b class="Latin">fero_</b>. More often intransitive ("differ", "be different") than transitive, and may appear with an Ablative of Respect. The person or group from whom one differs is usually expressed in the ablative case with the preposition <b class="Latin">a_ / ab</b>.'
								+'<br><u>Ex:</u> <b class="Latin">A_ fra_tre sententia_ differt.</b> - <i>He differs from (his) brother in (respect to) (his) opinion.</i>'
								+'</p>',
				type: 'verb 3',
				specialSyntax: {
					indicative: {
						active: {
							present: {
								singular: {
									second: 'differs',
									third:  'differt'
								},
								plural: {
									second: 'differtis'
								}
							}
						},
						passive: {
							present: {
								singular: {
									second: 'differris / differre',
									third:  'differtur'
								}
							}
						}
					},
					imperative: {
						active: {
							present: {
								singular: 'differ',
								plural:   'differte'
							}
						},
						passive: {
							present: {
								singular: 'differre'
							}
						}
					},
					infinitive: {
						active: {
							present: 'differre'
						},
						passive: {
							present: _('differri_')
						}
					}
				}
			}),

		// LTRL Ch.8
			conor: new Word({
				statement: 'co_nor, co_na_ri_, co_na_tus sum',
				definition: 'try, attempt',
				notes: '<p>Often takes an Object Infinitive and is sometimes used absolutely (make an effort).</p>',
				type: 'verb 1TDep',
				specialSyntax: null
			}),
			fateor: new Word({
				statement: 'fateor, fate_ri_, fassus sum',
				definition: 'confess, admit',
				notes: '<p></p>',
				type: 'verb 2Dep',
				specialSyntax: null
			}),
			sequor: new Word({
				statement: 'sequor, sequi_, secu_tus sum',
				definition: 'follow',
				notes: '<p>Compounds do not exhibit vowel weakening.</p>',
				type: 'verb 3Dep',
				specialSyntax: null
			}),
			morior: new Word({
				statement: 'morior, mori_, mortuus sum',
				definition: 'die',
				notes: '<p>Compounds do not exhibit vowel weakening.</p>',
				type: 'verb 3iDep',
				specialSyntax: {
					participle: {
						active: {
							future: _('moritu_rus, -a, -um')
						}
					}
				}
			}),
			experior: new Word({
				statement: 'experior, experi_ri_, expertus sum',
				definition: 'test; try; experience',
				notes: '<p></p>',
				type: 'verb 4Dep',
				specialSyntax: null
			}),
			audeo: new Word({
				statement: 'audeo_, aude_re, ausus sum',
				definition: 'dare',
				notes: '<p>May take an Object Infinitive or be used absolutely (be bold).</p>',
				type: 'verb 2SemiDep',
				specialSyntax: null
			}),
			relinquo: new Word({
				statement: 'relinquo_, relinquere, reli_qui_, relictus',
				definition: 'leave (behind), abandon',
				notes: '<p></p>',
				type: 'verb 3',
				specialSyntax: null
			}),
			valeo: new Word({
				statement: 'valeo_, vale_re, valui_, valitu_rus',
				definition: 'be strong, be able; be well, fare well',
				notes: '',
				type: 'verb 2',
				specialSyntax: null
			}),

		// LTRL Ch.9
			hortor: new Word({
				statement: 'hortor, horta_ri_, horta_tus sum',
				definition: 'urge, encourage, exhort',
				notes: '<p>A transitive verb that may take a direct object or introduce an Indirect Command.</p>',
				type: 'verb 1TDep',
				specialSyntax: null
			}),
			impero: new Word({
				statement: 'impero_, impera_re, impera_vi_, impera_tum',
				definition: 'give an order, order, command (+ dat.)',
				notes: '<p>An intransitive verb that may be used absolutely or take a Dative with an Intransitive Verb. May also introduce an Indirect Command.</p>',
				type: 'verb 1I',
				specialSyntax: null
			}),
			moneo: new Word({
				statement: 'moneo_, mone_re, monui_, monitus',
				definition: 'warn; remind; advise',
				notes: '<p>May introduce an Indirect Command. Compounds do not exhibit vowel weakening.</p>',
				type: 'verb 2',
				specialSyntax: null
			}),
			pareo: new Word({
				statement: 'pa_reo_, pa_re_re, pa_rui_, pa_ritu_rus',
				definition: 'be obedient, obey (+ dat.)',
				notes: '<p>An intransitive verb that may be used absolutely or take a Dative with an Intransitive Verb.</p>',
				type: 'verb 2',
				specialSyntax: null
			}),
			placeo: new Word({
				statement: 'placeo_, place_re, placui_, placitum',
				definition: 'be pleasing, please (+ dat.)',
				notes: '<p>An intransitive verb that may be used absolutely or take a Dative with an Intransitive Verb. May be used impersonally to mean "seem good," often with a Subject Infinitive.</p>',
				type: 'verb 2',
				specialSyntax: null
			}),
			patior: new Word({
				statement: 'patior, pati_, passus sum',
				definition: 'experience, suffer, endure; permit, allow',
				notes: '',
				type: 'verb 3iDep',
				specialSyntax: null
			}),
			pello: new Word({
				statement: 'pello_, pellere, pepuli_, pulsus',
				definition: 'push, drive (off)',
				notes: '',
				type: 'verb 3',
				specialSyntax: null
			}),
			quaero: new Word({
				statement: 'quaero_, quaerere, quaesii_ / quaesi_vi_, quaesi_tus',
				definition: 'search for, seek, ask',
				notes: '<p>May introduce an Indirect Command. The person from whom something is sought is expressed by <b class="Latin">a_, ab</b> + ablative.</p>',
				type: 'verb 3',
				specialSyntax: {
					indicative: {
						active: {
							perfect: {
								singular: {
									first:  _('quaesii_ / quaesi_vi_'),
									second: _('quaesiisti_ / quaesi_visti_'),
									third:  _('quaesiit / quaesi_vit')
								},
								plural: {
									first:  _('quaesiimus / quaesi_vimus'),
									second: _('quaesiistis / quaesi_vistis'),
									third:  _('quaesie_runt / quaesie_re / quaesi_ve_runt / quaesi_ve_re')
								}
							},
							pluperfect: {
								singular: {
									first:  _('quaesieram / quaesi_veram'),
									second: _('quaesiera_s / quaesi_vera_s'),
									third:  _('quaesierat / quaesi_verat')
								},
								plural: {
									first:  _('quaesiera_mus / quaesi_vera_mus'),
									second: _('quaesiera_tis / quaesi_vera_tis'),
									third:  _('quaesierant / quaesi_verant')
								}
							},
							futureperfect: {
								singular: {
									first:  _('quaesiero_ / quaesi_vero_'),
									second: _('quaesieris / quaesi_veris'),
									third:  _('quaesierit / quaesi_verit')
								},
								plural: {
									first:  _('quaesierimus / quaesi_verimus'),
									second: _('quaesieritis / quaesi_veritis'),
									third:  _('quaesierint / quaesi_verint')
								}
							}
						},
					},
					subjunctive: {
						active: {
							perfect: {
								singular: {
									first:  _('quaesierim / quaesi_verim'),
									second: _('quaesieris / quaesi_veris'),
									third:  _('quaesierit / quaesi_verit')
								},
								plural: {
									first:  _('quaesierimus / quaesi_verimus'),
									second: _('quaesieritis / quaesi_veritis'),
									third:  _('quaesierint / quaesi_verint')
								}
							},
							pluperfect: {
								singular: {
									first:  _('quaesiissem / quaesi_vissem'),
									second: _('quaesiisse_s / quaesi_visse_s'),
									third:  _('quaesiisset / quaesi_visset')
								},
								plural: {
									first:  _('quaesiisse_mus / quaesi_visse_mus'),
									second: _('quaesiisse_tis / quaesi_visse_tis'),
									third:  _('quaesiissent / quaesi_vissent')
								}
							}
						},
					}
				}
			}),

		// LTRL Ch.10
			oppugno: new Word({
				statement: 'oppugno_, oppugna_re, oppugna_vi_, oppugna_tus',
				definition: 'attack',
				notes: '<p>A compound verb formed by the addition of the prefix <b class="Latin">ob-</b> to the verb <b class="Latin">pugno_</b>. Unlike <b class="Latin">pugno_</b>, it is transitive.</p>',
				type: 'verb 1T',
				specialSyntax: null
			}),
			servo: new Word({
				statement: 'servo_, serva_re, serva_vi_, serva_tus',
				definition: 'save, preserve',
				notes: '<p></p>',
				type: 'verb 1T',
				specialSyntax: null
			}),
			sto: new Word({
				statement: 'sto_, sta_re, steti_, statum',
				definition: 'stand; stand fast, endure',
				notes: '<p>An irregular intransitive first conjugation verb.</p>',
				type: 'verb 1I',
				specialSyntax: null
			}),
			deleo: new Word({
				statement: 'de_leo_, de_le_re, de_le_vi_, de_le_tus',
				definition: 'destroy',
				notes: '<p></p>',
				type: 'verb 2',
				specialSyntax: null
			}),
			cado: new Word({
				statement: 'cado_, cadere, cecidi_, ca_sum',
				definition: 'fall, sink; die',
				notes: '<p></p>',
				type: 'verb 3',
				specialSyntax: null
			}),
			nascor: new Word({
				statement: 'na_scor, na_sci_, na_tus sum',
				definition: 'be born',
				notes: '<p>Compounds do not exhibit vowel weakening.</p>',
				type: 'verb 3Dep',
				specialSyntax: null
			}),
			nosco: new Word({
				statement: 'no_sco_, no_scere, no_vi_, no_tus',
				definition: 'come to know, learn, recognize; (in perf.) know',
				notes: '<p>An <i>inchoative</i> or <i>inceptive</i> verb - indicates that an action is beginning to occur.</p>',
				type: 'verb 3',
				specialSyntax: null
			}),
			cognosco: new Word({
				statement: 'cogno_sco_, cogno_scere, cogno_vi_, cognitus',
				definition: 'come to know, learn, recognize; (in perf.) know',
				notes: '<p>A compound verb formed by the addition of the prefix <b class="Latin">com-</b> to the verb <b class="Latin">no_sco_</b>, of which it is a strengthened form with all the same meanings. It exhibits irregular vowel weakening in the fourth principal part.</p>',
				type: 'verb 3',
				specialSyntax: null
			}),
			proficiscor: new Word({
				statement: 'profici_scor, profici_sci_, profectus sum',
				definition: 'set out, set forth',
				notes: '<p>In origin an inchoative verb.</p>',
				type: 'verb 3Dep',
				specialSyntax: null
			}),
			utor: new Word({
				statement: 'u_tor, u_ti_, u_sus sum',
				definition: 'use; experience, enjoy (+ abl.)',
				notes: '<p>Intransitive; takes an ablative of the thing used or experienced, translated as a direct object. Compounds do not exhibit vowel weakening.</p>',
				type: 'verb 3Dep',
				specialSyntax: null
			}),
			perfero: new Word({
				statement: 'perfero_, perferre, pertuli_, perla_tus',
				definition: 'suffer, endure; report',
				notes: '<p>A compound verb formed by the addition of the prefix <b class="Latin">per-</b> to the verb <b class="Latin">fero_</b>.</p>',
				type: 'verb 3',
				specialSyntax: {
					indicative: {
						active: {
							present: {
								singular: {
									second: 'perfers',
									third:  'perfert'
								},
								plural: {
									second: 'perfertis'
								}
							}
						},
						passive: {
							present: {
								singular: {
									second: 'perferris / perferre',
									third:  'perfertur'
								}
							}
						}
					},
					imperative: {
						active: {
							present: {
								singular: 'perfer',
								plural:   'perferte'
							}
						},
						passive: {
							present: {
								singular: 'perferre'
							}
						}
					},
					infinitive: {
						active: {
							present: 'perferre'
						},
						passive: {
							present: _('perferri_')
						}
					}
				}
			}),
			refero: new Word({
				statement: 'refero_, referre, rettuli_, rela_tus',
				definition: 'bring back; report',
				notes: '<p>A compound verb formed by the addition of the prefix <b class="Latin">re-</b> to the verb <b class="Latin">fero_</b>. Most commonly means "report."</p>',
				type: 'verb 3',
				specialSyntax: {
					indicative: {
						active: {
							present: {
								singular: {
									second: 'refers',
									third:  'refert'
								},
								plural: {
									second: 'refertis'
								}
							}
						},
						passive: {
							present: {
								singular: {
									second: 'referris / referre',
									third:  'refertur'
								}
							}
						}
					},
					imperative: {
						active: {
							present: {
								singular: 'refer',
								plural:   'referte'
							}
						},
						passive: {
							present: {
								singular: 'referre'
							}
						}
					},
					infinitive: {
						active: {
							present: 'referre'
						},
						passive: {
							present: _('referri_')
						}
					}
				}
			}),

		// LTRL Ch.11
			arbitror: new Word({
				statement: 'arbitror, arbitra_ri_, arbitra_tus sum',
				definition: 'judge, consider, think',
				notes: '',
				type: 'verb 1TDep',
				specialSyntax: null
			}),
			puto: new Word({
				statement: 'puto_, puta_re, puta_vi_, puta_tus',
				definition: 'think, suppose',
				notes: '',
				type: 'verb 1T',
				specialSyntax: null
			}),
			soleo: new Word({
				statement: 'soleo_, sole_re, solitus sum',
				definition: 'be accustomed',
				notes: '<p>Intransitive, regularly takes a Complementary Infinitive.</p>',
				type: 'verb 2SemiDep',
				specialSyntax: null
			}),
			credo: new Word({
				statement: 'cre_do_, cre_dere, cre_didi_, cre_ditus',
				definition: 'trust, believe (+ dat.)',
				notes: '<p>May be transitive or intransitive. When transitive, often takes a neuter pronoun as a direct object. When intransitive, may take a Dative with an Intransitive Verb. In the passive, may have a personal subject. May also introduce an Indirect Statement.</p>',
				type: 'verb 3',
				specialSyntax: null
			}),
			iacio: new Word({
				statement: 'iacio_, iacere, ie_ci_, iactus',
				definition: 'throw; utter; lay, establish',
				notes: '<p></p>',
				type: 'verb 3i',
				specialSyntax: null
			}),
			eicio: new Word({
				statement: 'e_icio_, e_icere, e_ie_ci_, e_iectus',
				definition: 'throw out, expel',
				notes: '<p><b class="Latin">e_-</b> + <b class="Latin">iacio_</b>. When taking a reflexive pronoun as a direct object, the combination may mean "rush forth."</p>',
				type: 'verb 3i',
				specialSyntax: null
			}),
			loquor: new Word({
				statement: 'loquor, loqui_, locu_tus sum',
				definition: 'speak',
				notes: '',
				type: 'verb 3Dep',
				specialSyntax: null
			}),
			invenio: new Word({
				statement: 'invenio_, inveni_re, inve_ni_, inventus',
				definition: 'find, discover',
				notes: '<p><b class="Latin">in-</b> + <b class="Latin">venio_</b>. Unlike <b class="Latin">venio_</b>, <b class="Latin">invenio_</b> is a transitive verb.</p>',
				type: 'verb 4',
				specialSyntax: null
			}),
			scio: new Word({
				statement: 'scio_, sci_re, scii_ / sci_vi_, sci_tus',
				definition: 'know',
				notes: '<p>When taking an infinitive, means "know how."</p>',
				type: 'verb 4',
				specialSyntax: null
			}),
			nescio: new Word({
				statement: 'nescio_, nesci_re, nescii_ / nesci_vi_, nesci_tus',
				definition: 'not know',
				notes: '<p>When taking an infinitive, means "not know how."</p>',
				type: 'verb 4',
				specialSyntax: null
			}),
			pereo: new Word({
				statement: 'pereo_, peri_re, perii_, peritu_rus',
				definition: 'pass away, be destroyed; perish, die',
				notes: '<p>May be used synonomously for <b class="Latin">morior</b>.</p>',
				type: 'verb Irr',
				specialSyntax: {
					indicative: {
						active: {
							present: {
								singular: {
									first:  _('abeo_'),
									second: _('abi_s'),
									third:  'abit'
								},
								plural: {
									first:  _('abi_mus'),
									second: _('abi_tis'),
									third:  'abeunt'
								}
							},
							perfect: {
								singular: {
									first:  _('abii_'),
									second: _('abi_sti_'),
									third:  _('abiit')
								},
								plural: {
									first:  _('abiimus'),
									second: _('abi_stis'),
									third:  _('abie_runt')
								}
							},
							imperfect: {
								singular: {
									first:  _('abi_bam'),
									second: _('abi_ba_s'),
									third:  _('abi_bat')
								},
								plural: {
									first:  _('abi_ba_mus'),
									second: _('abi_ba_tis'),
									third:  _('abi_bant')
								}
							},
							pluperfect: {
								singular: {
									first:  _('abieram'),
									second: _('abiera_s'),
									third:  _('abierat')
								},
								plural: {
									first:  _('abiera_mus'),
									second: _('abiera_tis'),
									third:  _('abierant')
								}
							},
							future: {
								singular: {
									first:  _('abi_bo_'),
									second: _('abi_bis'),
									third:  _('abi_bit')
								},
								plural: {
									first:  _('abi_bimus'),
									second: _('abi_bitis'),
									third:  _('abi_bunt')
								}
							},
							futureperfect: {
								singular: {
									first:  _('abiero_'),
									second: _('abieris'),
									third:  _('abierit')
								},
								plural: {
									first:  _('abierimus'),
									second: _('abieritis'),
									third:  _('abierint')
								}
							}
						},
						passive: {
							present: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							perfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							imperfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							pluperfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							future: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first:  '-',
									second: '-',
									third:  '-'
								}
							},
							futureperfect: {
								singular: {
									first:  '-',
									second: '-',
									third:  '-'
								},
								plural: {
									first: 	'-',
									second: '-',
									third:  '-'
								}
							}
						}
					},
					imperative: {
						active: {
							present: {
								singular: _('abi_'),
								plural:   _('abi_te')
							}
						},
						passive: {
							present: {
								singular: '-',
								plural:   '-'
							}
						}
					},
					infinitive: {
						active: {
							present: _('abi_re')
						},
						passive: {
							present: '-'
						}
					}
				}
			}),

		// LTRL Ch.12
			dubito: new Word({
				statement: 'dubito_, dubita_re, dubita_vi_, dubita_tus',
				definition: 'hesitate; doubt',
				notes: '<p>When meaning "hesitate", often followed by a Complementary Infinitive. When meaning "doubt," often introduces an Indirect Question or a Doubting Clause.</p>',
				type: 'verb 1T',
				specialSyntax: null
			}),
			oro: new Word({
				statement: 'o_ro_, o_ra_re, o_ra_vi_, o_ra_tus',
				definition: 'pray (for), beg (for)',
				notes: '<p>Takes a <b class="Latin">double accusative</b>, i.e. two Accusatives, Direct Object, fore the person begged or prayed <i>to</i>, and the thing begged or prayed <i>for</i>. May also introduce an Indirect Command.</p>',
				type: 'verb 1T',
				specialSyntax: null
			}),
			rogo: new Word({
				statement: 'rogo_, roga_re, roga_vi_, roga_tus',
				definition: 'ask (for)',
				notes: '<p>May introduce an indirect question or an indirect command. May take an Accusative, Direct Object expressing the person <i>asked</i> or the thing <i>asked for</i>. May take a double accusative expressing both.</p>',
				type: 'verb 1T',
				specialSyntax: null
			}),
			spero: new Word({
				statement: 'spe_ro_, spe_ra_re, spe_ra_vi_, spe_ra_tus',
				definition: 'hope (for)',
				notes: '<p>May be followed by an Accusative, Direct Object or introduce an Indirect Statement.</p>',
				type: 'verb 1T',
				specialSyntax: null
			}),

		},

		adjectives: {

		// LTRL Ch.3
			amicus: new Word({
				statement: 'ami_cus, ami_ca, ami_cum',
				definition: 'friendly (+ dat.)',
				notes: '<p>'
								+ 'Often found with a Dative of Reference indicating the person to whom someone is friendly. The dative is often found between the adjective and the noun that it modifies, e.g. <span class="Latin">' + _('Re_gi_na animam pueri_s ami_cam habet.') + '</span> - <i>The queen has a soul friendly to boys.</i>'
								+ '</p>',
				type: 'adjective 1,2',
				specialSyntax: ''
			}),
			inimicus: new Word({
				statement: 'inimi_cus, inimi_ca, inimi_cum',
				definition: 'unfriendly, hostile (+ dat.)',
				notes: '<p>'
								+ 'Often found with a Dative of Reference indicating the person to whom someone is unfriendly. The dative is often found between the adjective and the noun that it modifies, e.g. <span class="Latin">' + _('Re_gi_na animam pueri_s inimi_cam habet.') + '</span> - <i>The queen has a soul hostile to boys.</i>'
								+ '<br> <span class="Latin">' + _('inimi_cus') + '</span>  is a compound adjective formed by the addition of the prefix <span class="Latin">in-</span> (<i>not</i>) to <span class="Latin">'+ _('ami_cus') +'</span> (<i>friendly</i>)'
								+ '</p>',
				type: 'adjective 1,2',
				specialSyntax: ''
			}),
			bonus: new Word({
				statement: 'bonus, bona, bonum',
				definition: 'good',
				notes: '',
				type: 'adjective 1,2',
				specialSyntax: {
					adverb: 'bene'
				}
			}),
			laetus: new Word({
				statement: 'laetus, laeta, leatum',
				definition: 'happy',
				notes: '<p>'
								+ 'When describing plants, crops, etc., or when used to metaphorically describe literary or oratorical style, may mean <i>flourishing</i>, <i>rich</i>, or <i>luxuriant</i>. When describing omens or weather, often carries the notion of <i>favorable</i> or <i>propitious</i>.'
								+ '</p>',
				type: 'adjective 1,2',
				specialSyntax: ''
			}),
			liber: new Word({
				statement: 'li_ber, li_bera, li_berum',
				definition: 'free',
				notes: '<p>'
								+ 'Means <i>free</i> in a general sense (unrestrained, open), and in a social sense (free as opposed to enslaved).'
								+ '<br><span class="Latin">' + _('Li_beri_, li_bero_rum, m. pl.') + '</span> is a substantive of the adjective <span class="Latin">'+ _('li_ber, li_bera, li_berum') +'</span>, and means <i>children</i>.'
								+ '</p>',
				type: 'adjective 1,2',
				specialSyntax: ''
			}),
			magnus: new Word({
				statement: 'magnus, magna, magnum',
				definition: 'large, big; great',
				notes: '<p>'
								+ 'Has both a <i>quantitative</i> sense (big, large) and a <i>qualitative</i> sense (great).'
								+ '</p>',
				type: 'adjective 1,2',
				specialSyntax: ''
			}),
			malus: new Word({
				statement: 'malus, mala, malum',
				definition: 'bad, evil',
				notes: '',
				type: 'adjective 1,2',
				specialSyntax: {
					adverb: 'male'
				}
			}),
			miser: new Word({
				statement: 'miser, misera, miserum',
				definition: 'wretched, pitiable, miserable',
				notes: '',
				type: 'adjective 1,2',
				specialSyntax: ''
			}),
			multus: new Word({
				statement: 'multus, multa, multum',
				definition: 'much, many',
				notes: 'Note that adjectives of size or quantity often <i>precede</i> their nouns.',
				type: 'adjective 1,2',
				specialSyntax: {
					adverb: 'multum'
				}
			}),
			parvus: new Word({
				statement: 'parvus, parva, parvum',
				definition: 'small, little',
				notes: '',
				type: 'adjective 1,2',
				specialSyntax: ''
			}),
			pulcher: new Word({
				statement: 'pulcher, pulchra, pulchrum',
				definition: 'beautiful, handsome',
				notes: '',
				type: 'adjective 1,2',
				specialSyntax: ''
			}),
			Romanus: new Word({
				statement: 'Ro_ma_nus, Ro_ma_na, Ro_ma_num',
				definition: 'Roman',
				notes: '',
				type: 'adjective 1,2',
				specialSyntax: ''
			}),
			// sordidus: new Word({
			// 	statement: 'sordidus, sordida, sordidum',
			// 	definition: 'dirty, grimy, unwashed',
			// 	notes: '',
			// 	type: 'adjective 1,2',
			// 	specialSyntax: ''
			// }),
			// humanus: new Word({
			// 	statement: 'hu_ma_nus, hu_ma_na, hu_ma_num',
			// 	definition: 'human',
			// 	notes: '',
			// 	type: 'adjective 1,2',
			// 	specialSyntax: ''
			// }),
			// mutuus: new Word({
			// 	statement: 'mu_tuus, mu_tua, mu_tuum',
			// 	definition: 'shared, reciprocal, mutual',
			// 	notes: '',
			// 	type: 'adjective 1,2',
			// 	specialSyntax: ''
			// }),

		// LTRL Ch.4
			meus: new Word({
				statement: 'meus, mea, meum',
				definition: 'my, mine',
				notes: '<p>'
								+ 'Possessive adjectives may precede or follow the nouns the modify.'
								+ '<br>They may function as substantives, e.g. <span class="Latin">'+ _('meo_rum') +'</span> - <i>of my men</i> or <i>of my things</i>.'
								+ '<br>They may express the <i>idea</i> of a Subjective Genitive (less frequently an Objective Genitive), e.g. <span class="Latin">' + _('Magna erat mea cu_ra populi_') + '</span>. - <i>Great was my care of (for) the people</i>.'
								+ '<br>They are often omitted if the meaning is clear without them, but they are used for added clarity, emphasis, or contrast.'
								+ '</p>',
				type: 'adjective 1,2',
				specialSyntax: {
					vocative: {
						singular: {
							masculine: _('mi_')
						}
					}
				}
			}),
			noster: new Word({
				statement: 'noster, nostra, nostrum',
				definition: 'our, ours',
				notes: '<p>'
								+ 'Possessive adjectives may precede or follow the nouns the modify.'
								+ '<br>They may function as substantives, e.g. <span class="Latin">'+ _('meo_rum') +'</span> - <i>of my men</i> or <i>of my things</i>.'
								+ '<br>They may express the <i>idea</i> of a Subjective Genitive (less frequently an Objective Genitive), e.g. <span class="Latin">' + _('Magna erat mea cu_ra populi_') + '</span>. - <i>Great was my care of (for) the people</i>.'
								+ '<br>They are often omitted if the meaning is clear without them, but they are used for added clarity, emphasis, or contrast.'
								+ '</p>',
				type: 'adjective 1,2',
				specialSyntax: ''
			}),
			tuus: new Word({
				statement: 'tuus, tua, tuum',
				definition: 'your, yours',
				notes: '<p>'
								+ 'Possessive adjectives may precede or follow the nouns the modify.'
								+ '<br>They may function as substantives, e.g. <span class="Latin">'+ _('meo_rum') +'</span> - <i>of my men</i> or <i>of my things</i>.'
								+ '<br>They may express the <i>idea</i> of a Subjective Genitive (less frequently an Objective Genitive), e.g. <span class="Latin">' + _('Magna erat mea cu_ra populi_') + '</span>. - <i>Great was my care of (for) the people</i>.'
								+ '<br>They are often omitted if the meaning is clear without them, but they are used for added clarity, emphasis, or contrast.'
								+ '</p>',
				type: 'adjective 1,2',
				specialSyntax: ''
			}),
			vester: new Word({
				statement: 'vester, vestra, vestrum',
				definition: 'your (pl.), yours (pl.)',
				notes: '<p>'
								+ 'Possessive adjectives may precede or follow the nouns the modify.'
								+ '<br>They may function as substantives, e.g. <span class="Latin">'+ _('meo_rum') +'</span> - <i>of my men</i> or <i>of my things</i>.'
								+ '<br>They may express the <i>idea</i> of a Subjective Genitive (less frequently an Objective Genitive), e.g. <span class="Latin">' + _('Magna erat mea cu_ra populi_') + '</span>. - <i>Great was my care of (for) the people</i>.'
								+ '<br>They are often omitted if the meaning is clear without them, but they are used for added clarity, emphasis, or contrast.'
								+ '</p>',
				type: 'adjective 1,2',
				specialSyntax: ''
			}),
			altus: new Word({
				statement: 'altus, alta, altum',
				definition: 'tall, high; deep',
				notes: '',
				type: 'adjective 1,2',
				specialSyntax: ''
			}),
			clarus: new Word({
				statement: 'cla_rus, cla_ra, cla_rum',
				definition: 'bright, clear; famous',
				notes: '<p>In first sense, describes things like sky, color, or ligtning. It has a transferred sense of "evident" or "manifest", and in this sense describes more abstract concepts (plans, affairs). When applied to people, it means "famous".</p>',
				type: 'adjective 1,2',
				specialSyntax: ''
			}),
			cupidus: new Word({
				statement: 'cupidus, cupida, cupidum',
				definition: 'desirous (+ gen.)',
				notes: '<p>Often found with an Objective Genitive.</p>',
				type: 'adjective 1,2',
				specialSyntax: ''
			}),
			socius: new Word({
				statement: 'socius, socia, socium',
				definition: 'allied',
				notes: '',
				type: 'adjective 1,2',
				specialSyntax: ''
			}),
			validus: new Word({
				statement: 'validus, valida, validum',
				definition: 'strong; healthy',
				notes: '',
				type: 'adjective 1,2',
				specialSyntax: {
					adverb: _('valide_ / valde_')
				}
			}),
			decem: new Word({
				statement: 'decem',
				definition: 'ten',
				notes: '',
				type: 'adjective indeclinable',
				specialSyntax: ''
			}),

		// LTRL Ch.5
			mea: new Word({
				statement:  'meus, mea, meum',
				definition: 'my (own)',
				notes: '<p>'
								+ 'First and second person reflexive-possessive adjectives are borrowed from possessive adjectives and differ in translation only.'
								+ '</p>',
				type: 'adjective 1,2',
				specialSyntax: null
			}),
			tua: new Word({
				statement:  'tuus, tua, tuum',
				definition: 'your (own)',
				notes: '<p>'
								+ 'First and second person reflexive-possessive adjectives are borrowed from possessive adjectives and differ in translation only.'
								+ '</p>',
				type: 'adjective 1,2',
				specialSyntax: null
			}),
			nostra: new Word({
				statement:  'noster, nostra, nostrum',
				definition: 'our (own)',
				notes: '<p>'
								+ 'First and second person reflexive-possessive adjectives are borrowed from possessive adjectives and differ in translation only.'
								+ '</p>',
				type: 'adjective 1,2',
				specialSyntax: null
			}),
			vestra: new Word({
				statement:  'vester, vestra, vestrum',
				definition: 'your (pl.) (own)',
				notes: '<p>'
								+ 'First and second person reflexive-possessive adjectives are borrowed from possessive adjectives and differ in translation only.'
								+ '</p>',
				type: 'adjective 1,2',
				specialSyntax: null
			}),
			suus: new Word({
				statement:  'suus, sua, suum',
				definition: 'his (own), her (own), its (own), their (own)',
				notes: '<p>'
								+ 'The third person reflexive-possessive adjective may refer to a singular or plural subject.'
								+ '</p>',
				type: 'adjective 1,2',
				specialSyntax: null
			}),
			ipse: new Word({
				statement: 'ipse, ipsa, ipsum',
				definition: '-self, -selves; very',
				notes: '<p>'
								+ 'An intensive adjective <i>emphasizes</i> or <i>intensifies</i> the noun in modifies.'
								+ '<br>Example: <span class="Latin">' + _('Catili_na ipse ad pro_vinciam it.') + '</span> - <i> Catiline himself is going to the province.</i>'
								+ '<br>Example: <span class="Latin">' + _('Ipsa ad pro_vinciam i_bam.') + '</span> - <i> I myself (f.) was going to the province.</i>'
								+ '<br>Example: <span class="Latin">' + _('Anto_nius causum ipsam co_gitat.') + '</span> - <i> Antony is pondering the case itself.</i>'
								+ '<br>Example: <span class="Latin">' + _('In ipsi_s agri_s re_gi_nae eram.') + '</span> - <i> I was in the very fields of the queen.</i>'
								+ '<br><span class="Latin">ipse</span> often appears in sentences containing reflexive pronouns and modifies the subject <i>or</i> the reflexive pronoun.'
								+ '<br>Example: <span class="Latin">' + _('Ipse pro_ se_ pugna_bat.') + '</span> - <i>He himself was fighting for himself.</i>'
								+ '<br>Example: <span class="Latin">' + _('Pro_ se_ ipso_ pugna_bat') + '</span> - <i>He was fighting for his very self.</i>'
								+ '</p>',
				type: 'adjective 1,2',
				specialSyntax: {
					genitive: {
						singular: {
							masculine: _('ipsi_us'),
							feminine:  _('ipsi_us'),
							neuter:    _('ipsi_us')
						}
					},
					dative: {
						singular: {
							masculine: _('ipsi_'),
							feminine:  _('ipsi_'),
							neuter:    _('ipsi_')
						}
					}
				}
			}),
			durus: new Word({
				statement: 'du_rus, du_ra, du_rum',
				definition: 'hard; harsh',
				notes: '',
				type: 'adjective 1,2',
				specialSyntax: ''
			}),
			pius: new Word({
				statement: 'pius, pia, pium',
				definition: 'dutiful, loyal',
				notes: '<p>Describes one who acts in accordance with duty to one\'s family, country, or gods. When it describes a thing (war weapon cause), the dutifulness of a person has been transferred to the thing.</p>',
				type: 'adjective 1,2',
				specialSyntax: ''
			}),
			impius: new Word({
				statement: 'impius, impia, impium',
				definition: 'disloyal, wicked',
				notes: '',
				type: 'adjective 1,2',
				specialSyntax: ''
			}),

		// LTRL Ch.6
			antiquus: new Word({
				statement: 'anti_quus, anti_qua, anti_quum',
				definition: 'old, ancient',
				notes: '',
				type: 'adjective 1,2',
				specialSyntax: null
			}),
			novus: new Word({
				statement: 'novus, nova, novum',
				definition: 'new; strange',
				notes: '',
				type: 'adjective 1,2',
				specialSyntax: null
			}),
			pauci: new Word({
				statement: 'pauci_, paucae, pauca',
				definition: 'few',
				notes: '',
				type: 'adjective 1,2pl',
				specialSyntax: null
			}),

		// LTRL Ch.7
			acerbus: new Word({
				statement: 'acerbus, acerba, acerbum',
				definition: 'bitter; harsh',
				notes: null,
				type: 'adjective 1,2',
				specialSyntax: null
			}),
			carus: new Word({
				statement: 'ca_rus, ca_ra, ca_rum',
				definition: 'precious; dear (to) (+ dat.)',
				notes: '<p>When it takes a dative, the dative is often found between the adjective and the noun that it modifies.'
				+'<br><u>Ex:</u> <b class="Latin">Incolae di_s ca_ri_ disce_dunt.</b> - <i>The inhabitants dear to the gods are departing.</i>'
				+'</p>',
				type: 'adjective 1,2',
				specialSyntax: null
			}),
			certus: new Word({
				statement: 'certus, certa, certum',
				definition: 'sure, certain, reliable',
				notes: '<p>Has both a regular adverb, <b class="Latin">certe_</b>, and an irregular one, <b class="Latin">certo_</b>.</p>',
				type: 'adjective 1,2',
				specialSyntax: {
					adverb: _('certe_ / certo_')
				}
			}),
			incertus: new Word({
				statement: 'incertus, incerta, incertum',
				definition: 'unsure, uncertain, unreliable',
				notes: '<p>Has both a regular adverb, <b class="Latin">incerte_</b>, and an irregular one, <b class="Latin">incerto_</b>.</p>',
				type: 'adjective 1,2',
				specialSyntax: {
					adverb: _('incerte_ / incerto_')
				}
			}),
			falsus: new Word({
				statement: 'falsus, falsa, falsum',
				definition: 'deceptive, false',
				notes: '<p>Has both a regular adverb, <b class="Latin">false_</b>, and an irregular one, <b class="Latin">falso_</b>.</p>',
				type: 'adjective 1,2',
				specialSyntax: null
			}),
			verus: new Word({
				statement: 've_rus, ve_ra, ve_rum',
				definition: 'real, true',
				notes: null,
				type: 'adjective 1,2',
				specialSyntax: {
					adverb: _('ve_re_ / ve_ro_')
				}
			}),

			divus: new Word({
				statement:  'di_vus, di_va, di_vum',
				definition: 'deified, divine',
				notes: '',
				type: 'adjective 1,2',
				specialSyntax: null
			}),
			divinus: new Word({
				statement:  'di_vi_nus, di_vi_na, di_vi_num',
				definition: 'belonging to the gods, divine',
				notes: '',
				type: 'adjective 1,2',
				specialSyntax: null
			}),
			augustus: new Word({
				statement:  'augustus, augusta, augustum',
				definition: 'venerable, revered',
				notes: '<p>Had been applied only to religious objects, temples, and the like, but never to a person, until Octavian took it as an honorific name.</p>',
				type: 'adjective 1,2',
				specialSyntax: null
			}),

		// LTRL Ch.8
			publicus: new Word({
				statement: 'pu_blicus, pu_blica, pu_blicum',
				definition: 'public',
				notes: null,
				type: 'adjective 1,2',
				specialSyntax: null
			}),
			acer: new Word({
				statement: 'a_cer, a_cris, a_cre',
				definition: 'sharp, keen; fierce',
				notes: null,
				type: 'adjective 3',
				specialSyntax: null
			}),
			facilis: new Word({
				statement: 'facilis, facile',
				definition: 'easy',
				notes: '<p>May be used of tools that are easy to work with (<i>tractable</i>), of people or things that move with ease (<i>nimble, agile</i>), or of gods, people, or animals that are easily moved (<i>favorable, gracious, indulgent, tame</i>)</p>',
				type: 'adjective 3',
				specialSyntax: {
					adverb: 'facile'
				}
			}),
			difficilis: new Word({
				statement: 'difficilis, difficile',
				definition: 'difficult',
				notes: '<p>(<b class="Latin">dis-</b> + <b class="Latin">facilis</b>). Exhibits regular vowel weakening of the stem vowel. May be used of people or animals that are hard to move (<i>stubborn, inflexible, intractable</i>).</p>',
				type: 'adjective 3',
				specialSyntax: {
					adverb: 'difficiliter / difficulter'
				}
			}),
			felix: new Word({
				statement: 'fe_li_x, fe_li_cis',
				definition: 'lucky, fortunate, happy',
				notes: '<p>Means "fruitful," "rich," or "productive" when describing plants, trees, land, etc.</p>',
				type: 'adjective 3',
				specialSyntax: null
			}),
			infelix: new Word({
				statement: 'i_nfe_li_x, i_nfe_li_cis',
				definition: 'unlucky, unfortunate, unhappy',
				notes: null,
				type: 'adjective 3',
				specialSyntax: null
			}),
			fortis: new Word({
				statement: 'fortis, forte',
				definition: 'brave; strong',
				notes: null,
				type: 'adjective 3',
				specialSyntax: null
			}),
			ingens: new Word({
				statement: 'inge_ns, ingentis',
				definition: 'huge; outstanding',
				notes: null,
				type: 'adjective 3',
				specialSyntax: null
			}),
			omnis: new Word({
				statement: 'omnis, omne',
				definition: 'every; all',
				notes: null,
				type: 'adjective 3',
				specialSyntax: {
					adverb: _('omni_no_')
				}
			}),
			hic: new Word({
				statement: 'hic, haec, hoc',
				definition: 'this; these',
				notes:'<p>Regularly precedes the noun it modifies.'
							+'<br>When used substantively (as a <i>demonstrative pronoun</i>) in the neuter form, may point to either what has preceded or what is to follow, and is translated "this/these preceding/following thing(s)."'
							+'<br>When used together with <b class="Latin">ille</b> to refer to two elements previously mentioned, means "the latter," while <b class="Latin">ille</b> means "the former."'
							+'</p>',
				type: 'adjective demonstrative',
				specialSyntax: null
			}),
			iste: new Word({
				statement: 'iste, ista, istud',
				definition: 'that (of yours); those (of yours)',
				notes: '<p>Regularly precedes the noun it modifies.'
							+'<br>May be used to express contempt, translated "that / those (contemptible) ---- (of yours)."</p>',
				type: 'adjective demonstrative',
				specialSyntax: null
			}),
			ille: new Word({
				statement: 'ille, illa, illud',
				definition: 'that; those',
				notes: '<p>Regularly precedes the noun it modifies.'
							+'<br>May be used to point to what is celebrated or notorious, often placed after the noun it modifies.'
							+'<br>When used substantively (as a <i>demonstrative pronoun</i>) in the neuter form, may point to either what has preceded or what is to follow, and is translated "that/those preceding/following thing(s)."'
							+'<br>When used together with <b class="Latin">hic</b> to refer to two elements previously mentioned, means "the former," while <b class="Latin">hic</b> means "the latter."'
							+'</p>',
				type: 'adjective demonstrative',
				specialSyntax: null
			}),

		// LTRL Ch.9
			qui: new Word({
				statement: 'qui_, quae, quod',
				definition: '(interrog. adj.) what..., which...',
				notes: null,
				type: 'adjective interrogative',
				specialSyntax: null
			}),
			caecus: new Word({
				statement: 'caecus, caeca, caecum',
				definition: 'blind; hidden, secret, dark',
				notes: '<p>An active meaning (blind- <i>not seeing</i>) and a passive meaning (hidden - <i>not being seen</i>).</p>',
				type: 'adjective 1,2',
				specialSyntax: null
			}),
			gravis: new Word({
				statement: 'gravis, grave',
				definition: 'heavy, deep; important, serious; severe',
				notes: null,
				type: 'adjective 3',
				specialSyntax: null
			}),
			levis: new Word({
				statement: 'levis, leve',
				definition: 'light; trivial; fickle',
				notes: null,
				type: 'adjective 3',
				specialSyntax: null
			}),
			alius: new Word({
				statement: 'alius, alia, aliud',
				definition: 'other, another',
				notes: '<p>Used in various expressions where it is repeated and special translations are required.'
								+'<br><u>Ex:</u> <b class="Latin">Alia aurum, alia sapientiam optat.</b> - <i>One woman desires gold, another wisdom.</i>'
								+'<br><u>Ex:</u> <b class="Latin">Alii_ ci_ve_s bellum gerere optant, alii_ timo_re fugere.</b> - <i>Some citizens desire to wage war, others to flee because of fear.</i>'
								+'<br>In a parallel construction as above, its forms must be in the same gender, number, and case. Such sentences are translated "one...another..." in the singular or "some...other(s)..." in the plural.'
								+'</p>',
				type: 'adjective pronominal',
				specialSyntax: {
					nominative: {
						singular: {
							neuter: 'aliud'
						}
					},
					genitive: {
						singular: {
							masculine: _('ali_us / alteri_us'),
							feminine:  _('ali_us / alteri_us'),
							neuter:    _('ali_us / alteri_us'),
						}
					},
					accusative: {
						singular: {
							neuter: 'aliud'
						}
					}
				}
			}),
			alter: new Word({
				statement: 'alter, altera, alterum',
				definition: 'the other (of two)',
				notes: '<p>Used in various expressions where it is repeated and special translations are required.'
								+'<br><u>Ex:</u> <b class="Latin">Alter in agro_ labo_rat, alter in urbe.</b> - <i>One man (of two) works in the field, the other in the city.</i>'
								+'<br>In a parallel construction as above, its forms must be in the same gender, number, and case. Such sentences are translated "(the) one...the other..."'
								+'<br><u>Ex:</u> <b class="Latin">Alio_s servo_s alio_ in agro_ vi_de_runt.</b> - <i>They saw some slaves in one field, other slaves in another field.</i>'
								+'<br>In the sentence above, two forms in different cases are used, having a <i>complementary</i> relation. A comparison is implied, and the first part of the comparison should be supplied in the translation.'
								+'</p>',
				type: 'adjective pronominal',
				specialSyntax: null
			}),
			idem: new Word({
				statement: 'i_dem, eadem, idem',
				definition: 'same',
				notes: '<p>Formed by the addition of the suffix <b class="Latin">-dem</b> to the demonstrative adjective <b class="Latin">is, ea, id</b>, with certain variations. Occasionally the uncontracted forms <b class="Latin">ii_dem</b> and <b class="Latin">ii_sdem</b> occur in the nominative plural, and the dative and ablative plural, respectively.</p>',
				type: 'adjective idem',
				specialSyntax: null
			}),
			neuter: new Word({
				statement: 'neuter, neutra, neutrum',
				definition: 'neither (of two)',
				notes: '<p>Formed by the addition of the negative particle <b class="Latin">ne_-</b> to <b class="Latin">uter</b>.</p>',
				type: 'adjective pronominal',
				specialSyntax: null
			}),
			nullus: new Word({
				statement: 'nu_llus, nu_lla, nu_llum',
				definition: 'not any, no',
				notes: null,
				type: 'adjective pronominal',
				specialSyntax: null
			}),
			solus: new Word({
				statement: 'so_lus, so_la, so_lum',
				definition: 'alone, only',
				notes: null,
				type: 'adjective pronominal',
				specialSyntax: null
			}),
			totus: new Word({
				statement: 'to_tus, to_ta, to_tum',
				definition: 'whole',
				notes: null,
				type: 'adjective pronominal',
				specialSyntax: null
			}),
			ullus: new Word({
				statement: 'u_llus, u_lla, u_llum',
				definition: 'any',
				notes: null,
				type: 'adjective pronominal',
				specialSyntax: null
			}),
			unus: new Word({
				statement: 'u_nus, u_na, u_num',
				definition: 'one; only',
				notes: null,
				type: 'adjective pronominal',
				specialSyntax: null
			}),
			uter: new Word({
				statement: 'uter, utra, utrum',
				definition: 'which (of two)',
				notes: '<p>An <i>interrogative</i> adjective, assuming only two possible answers to the question it poses. Often used substantively.'
							+'<br><u>Ex:</u> <b class="Latin">In utro_ oppido_ vi_vis?</b> - <i>In which town (of two [towns]) do you live?</i>'
							+'<br><u>Ex:</u> <b class="Latin">Utrum vide_re opta_s?</b> - <i>Which (man or thing) (of two) do you desire to see?</i>'
							+'</p>',
				type: 'adjective pronominal',
				specialSyntax: null
			}),

		// LTRL Ch.10
			quidam: new Word({
				statement: 'qui_dam, quaedam, quoddam',
				definition: '(indef. adj.) (a) certain',
				notes: '<p>An <i>indefinite adjective</i> is an adjective that does not define or specify the person or thing it modifies. <b class="Latin">qui_dam, quaedam, quiddam</b> is an indefinite adjective formed by the addition of the suffix <b class="Latin">-dam</b> to the relative pronoun <b class="Latin">qui_, quae, quod</b>.</p>',
				type: 'adjective indefinite',
				specialSyntax: null
			}),
			aequus: new Word({
				statement: 'aequus, aequa, aequum',
				definition: 'level, even; equitable, just; calm, tranquil',
				notes: null,
				type: 'adjective 1,2',
				specialSyntax: null
			}),
			iniquus: new Word({
				statement: 'ini_quus, ini_qua, ini_quum',
				definition: 'uneven; inequitable, unjust',
				notes: '<p>A compound adjective formed by the addition of the prefix <b class="Latin">in-</b> to <b class="Latin">aequus</b></p>',
				type: 'adjective 1,2',
				specialSyntax: null
			}),
			honestus: new Word({
				statement: 'honestus, honesta, honestum',
				definition: 'honorable, respectable',
				notes: null,
				type: 'adjective 1,2',
				specialSyntax: null
			}),
			medius: new Word({
				statement: 'medius, media, medium',
				definition: 'middle (of); (as subst.) midst',
				notes: '<p>Usually appears before the noun that it modifies.</p>',
				type: 'adjective 1,2',
				specialSyntax: null
			}),

		// LTRL Ch.11
			longus: new Word({
				statement: 'longus, longa, longum',
				definition: 'long; far; long-standing; far-reaching',
				notes: null,
				type: 'adjective 1,2',
				specialSyntax: null
			}),
			summus: new Word({
				statement: 'summus, summa, summum',
				definition: 'highest; top (of); last, final',
				notes: '<p>When meaning "top of," usually appears before the noun that it modifies.</p>',
				type: 'adjective 1,2',
				specialSyntax: null
			}),
			brevis: new Word({
				statement: 'brevis, breve',
				definition: 'short, brief',
				notes: null,
				type: 'adjective 3',
				specialSyntax: null
			}),
			humilis: new Word({
				statement: 'humilis, humile',
				definition: 'humble',
				notes: null,
				type: 'adjective 3',
				specialSyntax: null
			}),
			sapiens: new Word({
				statement: 'sapie_ns, sapientis',
				definition: 'wise',
				notes: null,
				type: 'adjective 3',
				specialSyntax: null
			}),
			similis: new Word({
				statement: 'similis, simile',
				definition: 'similar (+ gen. or dat.)',
				notes: '<p>May take a genitive or dative expressing that to which something is similar.</p>',
				type: 'adjective 3',
				specialSyntax: null
			}),
			dissimilis: new Word({
				statement: 'dissimilis, dissimile',
				definition: 'dissimilar, unlike, different (+ gen. or dat.)',
				notes: '<p>May take a genitive or dative expressing that to which something is dissimilar.</p>',
				type: 'adjective 3',
				specialSyntax: null
			}),

		},

		prepositions: {

		// LTRL Ch.1
			ab: new Word({
				statement: 'a_, ab',
				definition: '(prep. + abl.) (away) from (prep. + abl.) by',
				notes: _('<p><b>ab</b> is used before words beginning with vowels or <b>h-</b>. Both <b>a_</b> and <b>ab</b> are used before words beginning with consonants, but <b>a_</b> is more frequent.</p>'), // *
				type: 'preposition',
				specialSyntax: '' // *
			}),
			ad: new Word({
				statement: 'ad',
				definition: '(prep. + acc.) toward, to',
				notes: '', // *
				type: 'preposition',
				specialSyntax: '' // *
			}),
			cum: new Word({
				statement: 'cum',
				definition: '(prep. + abl.) with',
				notes: '', // *
				type: 'preposition',
				specialSyntax: '' // *
			}),
			de: new Word({
				statement: 'de_',
				definition: '(prep. + abl.) (down) from; about, concerning',
				notes: '', // *
				type: 'preposition',
				specialSyntax: '' // *
			}),
			ex: new Word({
				statement: 'e_, ex',
				definition: '(prep. + abl.) (out) from',
				notes: _('<p><b>ex</b> is used before words beginning with vowels or <b>h-</b>. Both <b>e_</b> and <b>ex</b> are used before words beginning with consonants, but <b>ex</b> is more frequent.</p>'), // *, // *
				type: 'preposition',
				specialSyntax: '' // *
			}),
			in: new Word({
				statement: 'in',
				definition: '(prep. + acc.) into, onto; against (prep. + abl.) in, on',
				notes: '', // *
				type: 'preposition',
				specialSyntax: '' // *
			}),

		// LTRL Ch.3
			pro: new Word({
				statement: 'pro_',
				definition: '(prep. + abl.) in front of; on behalf of, for; in return for, instead of',
				notes: '<p>'
						 + '<br><u>Ex.</u> <b class="Latin">Est via <u>pro_</u> oppido_.</b> - <i>There is a street <u>in front of</u> the town.</i>'
						 + '<br><u>Ex.</u> <b class="Latin"><u>Pro_</u> fi_lii_s labo_rat.</b> - <i>He works <u>on behalf of</u> (his) sons.</i>'
						 + '<br><u>Ex.</u> <b class="Latin"><u>Pro_</u> facti_s poena_s dabit.</b> - <i>He will pay the penalty <u>in return for (in exchange for)</u> his deeds.</i>'
						 + '</p>',
				type: 'preposition',
				specialSyntax: null
			}),
			propter: new Word({
				statement: 'propter',
				definition: '(prep. + acc.) on account of, because of',
				notes: null,
				type: 'preposition',
				specialSyntax: null
			}),
			sine: new Word({
				statement: 'sine',
				definition: '(prep. + abl.) without',
				notes: null,
				type: 'preposition',
				specialSyntax: null
			}),
			sub: new Word({
				statement: 'sub',
				definition: '(prep. + abl.) under',
				notes: null,
				type: 'preposition',
				specialSyntax: null
			}),

		// LTRL Ch.4
			per: new Word({
				statement: 'per',
				definition: '(prep. + acc.) through',
				notes: null,
				type: 'preposition',
				specialSyntax: null
			}),

		// LTRL Ch.5
			inter: new Word({
				statement: 'inter',
				definition: '(prep. + acc.) between, among; during',
				notes: null,
				type: 'preposition',
				specialSyntax: null
			}),
			sub: new Word({
				statement: 'sub',
				definition: '(prep. + acc.) under; up to (prep. + abl.) under; at the foot of; near',
				notes: '<p>When it takes the accusative, it conveys either an idea of motion "under" or of motion from below "up to" a place. When it takes an ablative, it indicates something "under", "at the foot of", "close up to", or "near" which someone or something is located.'
								+ '<br><u>Ex:</u> <b class="Latin">Mi_lite_s sub moenia mi_sit.</b> - <i>He sent the soldiers up to the city walls.</i>'
								+ '<br><u>Ex:</u> <b class="Latin">Erant mi_lite_s sub oppido_.</b> - <i>There were sailors near the town.</i>'
								+'</p>',
				type: 'preposition',
				specialSyntax: null
			}),

		// LTRL Ch.7
			ante: new Word({
				statement: 'ante',
				definition: '(adv.) before, earlier, previously (prep. + acc.) before; in front of',
				notes: '<p>As an adverb, <b class="Latin">ante</b> most frequently has a temporal sense, but sometimes conveys the spatial sense of "ahead" or "in advance". As a preposition, it may have a temporal or a spatial sense.'
							+'<br><u>Ex:</u> <b class="Latin">Mi_lite_s ante ambula_bant.</b> - <i>The soldiers were walking ahead (in front).</i> (Adverb)'
							+'<br><u>Ex:</u> <b class="Latin">Verba poe_tae ante no_n intelle_xi_.</b> - <i>I did not understand the words of the poet before (previously).</i> (Adverb)'
							+'<br><u>Ex:</u> <b class="Latin">Nauta ante templum ambula_bat.</b> - <i>The sailor was walking in front of the temple.</i> (Preposition)'
							+'<br><u>Ex:</u> <b class="Latin">Ante bellum miseri_ erant incolae.</b> - <i>Before the war the inhabitants were miserable.</i> (Preposition)'
							+'</p>',
				type: 'preposition',
				specialSyntax: null
			}),
			post: new Word({
				statement: 'post',
				definition: '(adv.) after(ward), later; behind (prep. + acc.) after; behind',
				notes: '<p>As an adverb, most frequently has a temporal sense but sometimes has a spatial sense. As a preposition, may have a temporal or spatial sense.</p>',
				type: 'preposition',
				specialSyntax: null
			}),

		// LTRL Ch.9
			ob: new Word({
				statement: 'ob',
				definition: '(prep. + acc.) on account of, because of',
				notes: '',
				type: 'preposition',
				specialSyntax: null
			}),

		// LTRL Ch.10
			contra: new Word({
				statement: 'contra_',
				definition: '(adv.) face to face; in opposition; in turn (prep. + acc.) facing; against, contrary to',
				notes: null,
				type: 'preposition',
				specialSyntax: null
			}),
			apud: new Word({
				statement: 'apud',
				definition: '(prep. + acc.) at, near; at the house of, in the presence of, among',
				notes: '',
				type: 'preposition',
				specialSyntax: null
			}),


		},

		conjunctions: {

		// LTRL Ch.1
			et: new Word({
				statement: 'et',
				definition: '(conj.) and (adv.) even, also',
				notes: '<p>'
							 +'When acting as a conjunction, <b>et</b> is a <b>coordinating conjunction</b>, which means that it connects only parallel or grammatically balanced words, phrases, or clauses. When two nouns are connected, they must be in the same case.'
							 +'<br>When acting as an adverb, <b>et</b> usually qualifies a <i>single</i> noun, verb, or adjective, e.g. <b>et vir</b> (<i>even the man</i>, or <i>the man also</i>).'
							 +'</p>', // *
				type: 'conjunction',
				specialSyntax: '' // *
			}),
			'-que': new Word({
				statement: '-que',
				definition: '(enclitic conj.) and',
				notes: _('<p>'
								+'<b>-que</b> is an <b>enclitic conjunction</b>, from the Greek <span class="Latin">enkli_no_</span> (<i>lean on</i>), and as such, is directly attached to the word preceding it.'
								+'<b>-que</b> is attached to the <i>second</i> element of a closely related pair, whose elements are often opposite or complementary, e.g. <b>vir fe_minaque</b> (<i>husband and wife</i>). Like <b>et</b>, it may connect grammatical elements other than nouns.'
								+'</p>'), // *
				type: 'conjunction',
				specialSyntax: '' // *
			}),

		// LTRL Ch.2
			enim: new Word({
				statement: 'enim',
				definition: '(postpositive conj.) in fact, indeed; for',
				notes: _('<p>'
								+ '<b class="Latin">Enim</b> is postpositive (\<<span class="Latin">postpo_no_</span> - <i>put after</i>) because it is regularly <i>placed after</i> the first word (or second word) of a sentence. <b class="Latin">Enim</b> is used to join two sentences or clauses when the second sentence or clause <u>explains</u> (<i>for</i>) or <u>confirms</u> (<i>in fact, indeed</i>) a preceding one.'
								// + '<br><u>Ex.</u> <b class="Latin"><u></u></b> - <i><u></u></i>'
								+ '<br><u>Ex.</u> <b class="Latin">Re_gi_na ad oppidum ambulat. Do_na <u>enim</u> di_s dare optat.</b> - (explanation) <i>The queen is walking to the town. <u>For</u> she desires to give gifts to the gods.</i>'
								+ '<br><u>Ex.</u> <b class="Latin">Agricola ve_la dare optat. Nihil <u>enim</u> timet.</b> - (confirmation) <i>The farmer desires to set sail. <u>Indeed</u>, he is afraid of nothing.</i>'
								+ '<p>'),
				type: 'conjunction',
				specialSyntax: null
			}),
			etenim: new Word({
				statement: 'etenim',
				definition: '(conj.) and indeed; for in fact',
				notes: _('<p>'
								+ 'Identical to but stronger than <b class="Latin">enim</b> in usage, and <i>not</i> postpositive.'
								+ '<p>'),
				type: 'conjunction',
				specialSyntax: null
			}),
			nam: new Word({
				statement: 'nam',
				definition: '(conj.) for',
				notes: _('<p>'
								+ '<b class="Latin">Nam</b> is used to join two sentences or clauses when the second sentence or clause <u>explains</u> or <u>confirms</u> a preceding one.'
								+ '<br><u>Ex.</u> <b class="Latin">Re_gi_na ad oppidum ambulat. <u>Nam</u> do_na di_s dare optat.</b> - (explanation) <i>The queen is walking to the town. <u>For</u> she desires to give gifts to the gods.</i>'
								+ '<p>'),
				type: 'conjunction',
				specialSyntax: null
			}),
			namque: new Word({
				statement: 'namque',
				definition: '(conj.) for in fact',
				notes: _('<p>'
								+ 'Identical to but stronger than <b class="Latin">nam</b> in usage.'
								+ '<p>'),
				type: 'conjunction',
				specialSyntax: null
			}),
			neque: new Word({
				statement: 'neque, nec',
				definition: '(conj.-adv.) and not',
				notes: '<p>Both a conjunction (<i>and</i>) and an adverb (<i>not</i>) at the same time.</p>',
				type: 'conjunction',
				specialSyntax: null
			}),
			sed: new Word({
				statement: 'sed',
				definition: '(conj.) but',
				notes: null,
				type: 'conjunction',
				specialSyntax: null
			}),
			si: new Word({
				statement: 'si_',
				definition: '(conj.) if',
				notes: null,
				type: 'conjunction',
				specialSyntax: null
			}),

		// LTRL Ch.3
			atque: new Word({
				statement: 'atque / ac',
				definition: '(conj.) and (what\'s more)',
				notes: '<p><b class="Latin">Atque</b> is used before words beginning with a vowel or h, and both are used before words beginning with consonants.</p>',
				type: 'conjunction',
				specialSyntax: null
			}),

		// LTRL Ch.5
			etsi: new Word({
				statement: 'etsi_',
				definition: '(conj.) although',
				notes: '',
				type: 'conjunction',
				specialSyntax: null
			}),
			nisi: new Word({
				statement: 'nisi',
				definition: '(conj.) if...not, unless',
				notes: '',
				type: 'conjunction',
				specialSyntax: null
			}),
			postquam: new Word({
				statement: 'postquam',
				definition: '(conj.) after',
				notes: '',
				type: 'conjunction',
				specialSyntax: null
			}),
			quamquam: new Word({
				statement: 'quamquam',
				definition: '(conj.) although',
				notes: '',
				type: 'conjunction',
				specialSyntax: null
			}),
			quoniam: new Word({
				statement: 'quoniam',
				definition: '(conj.) since, because',
				notes: '',
				type: 'conjunction',
				specialSyntax: null
			}),
			ubi: new Word({
				statement: 'ubi',
				definition: '(conj.) when; (interrog. adv.) where, when (rel. adv.) where',
				notes: '<p>May be used as a subordinating conjunction (when) that introduces a temporal clause, or as an interrogative adverb (when, where) that introduces a question.'
								+'<br><u>Ex.</u> <b class="Latin">Ubi ad oppidum venit, labo_ra_re no_n optat.</b> - <i>When she comes to the town, she does not desire to work.</i>'
								+'<br><u>Ex.</u> <b class="Latin">Ubi veniet? Ubi est? Ubi est Ro_ma?</b> - <i>When will she come? Where is she? Where is Rome?</i>'
								+'</p>',
				type: 'conjunction',
				specialSyntax: null
			}),
			ut: new Word({
				statement: 'ut',
				definition: '(conj.) as; when; (introduces Purpose clause) in order that; (introduces Indirect Command) that',
				notes: '<p>Often used with the adverb <b class="Latin">si_c</b> to make comparisons. The subordinate clause introduced by <b class="Latin">ut</b> provides a <i>standard of comparison</i> for the main clause that includes <b class="Latin">si_c</b>.'
								+'<br><u>Ex.</u> <b class="Latin">Ut agricola agro_s, si_c poe_ta verba co_gitat.</b> - <i> As a farmer ponders the fields, so a poet ponders words.</i>'
								+'</p>',
				type: 'conjunction',
				specialSyntax: null
			}),

		// LTRL Ch.6
			autem: new Word({
				statement: 'autem',
				definition: '(postpositive conj.) however; moreover',
				notes: '<p>Joins two sentences or clauses.'
								+'<br><u>Ex:</u> <b class="Latin">Nihil scri_bo_. Multa autem lego_.</b> - <i>I write nothing. However, I read many things.</i>'
								+'<br><u>Ex:</u> <b class="Latin">Anto_nius bene di_cit. Bene autem scri_bit.</b> - <i>Antony speaks well. Moreover, he writes well.</i>'
								+'</p>',
				type: 'conjunction',
				specialSyntax: null
			}),

		// LTRL Ch.7
			aut: new Word({
				statement: 'aut',
				definition: '(conj.) or',
				notes: '<p><b class="Latin">aut</b> is a coordinating conjunction that connects only parallel or grammatically balanced words, phrases, or clauses. It joins a previous word, phrase, or clause with another equivalent one that is antithetical to it. It is used to indicate mutually exclusive propositions.'
								+'<br><u>Ex:</u> <b class="Latin">Incola est fe_mina aut vir.</b> - <i>The inhabitant is a woman or a man.</i>'
								+'</p>',
				type: 'conjunction',
				specialSyntax: null
			}),
			verum: new Word({
				statement: 've_rum',
				definition: '(conj.) but',
				notes: '<p>Derived from the adjective <b class="Latin">ve_rus, -a, -um</b>.</p>',
				type: 'conjunction',
				specialSyntax: null
			}),

		// LTRL Ch.9
			ne: new Word({
				statement: 'ne_',
				definition: '(adv.) not; (conj.) (introduces negative Purpose clause) in order that...not; (introduces negative Indirect Command) that...not',
				notes: '<p>Used only in particular constructions with verbs in the subjunctive.</p>',
				type: 'conjunction',
				specialSyntax: null
			}),

		// LTRL Ch.10
			quin: new Word({
				statement: 'qui_n',
				definition: '(conj.) (introduces Relative Clause of Characteristic) who/that...not',
				notes: '',
				type: 'conjunction',
				specialSyntax: null
			}),

		// LTRL Ch.11
			igitur: new Word({
				statement: 'qui_n',
				definition: '(postpos. conj.) therefore',
				notes: '<p>Occasionally used to indicate the resumption of an idea after a digression ("well then").</p>',
				type: 'conjunction',
				specialSyntax: null
			}),

		},

		adverbs: {

		// LTRL Ch.1
			et: new Word({
				statement: 'et',
				definition: '(conj.) and (adv.) even, also',
				notes: '<p>'
							 +'When acting as a conjunction, <b>et</b> is a <b>coordinating conjunction</b>, which means that it connects only parallel or grammatically balanced words, phrases, or clauses. When two nouns are connected, they must be in the same case.'
							 +'<br>When acting as an adverb, <b>et</b> usually qualifies a <i>single</i> noun, verb, or adjective, e.g. <b>et vir</b> (<i>even the man</i>, or <i>the man also</i>).'
							 +'</p>', // *
				type: 'adverb',
				specialSyntax: '' // *
			}),

		// LTRL Ch.2
			cur: new Word({
				statement: 'cu_r',
				definition: '(interrog. adv.) why',
				notes: null,
				type: 'adverb',
				specialSyntax: null
			}),
			neque: new Word({
				statement: 'neque, nec',
				definition: '(conj.-adv.) and not',
				notes: '<p>Both a conjunction (<i>and</i>) and an adverb (<i>not</i>) at the same time.</p>',
				type: 'adverb',
				specialSyntax: null
			}),
			non: new Word({
				statement: 'no_n',
				definition: '(adv.) not',
				notes: null,
				type: 'adverb',
				specialSyntax: null
			}),
			nondum: new Word({
				statement: 'no_ndum',
				definition: '(adv.) not yet',
				notes: null,
				type: 'adverb',
				specialSyntax: null
			}),

		// LTRL Ch.3
			mox: new Word({
				statement: 'mox',
				definition: '(adv.) soon; then',
				notes: '<p>'
						 + '<br><u>Ex.</u> <b class="Latin">Poe_ta in viam ambulat. <u>Mox</u> re_gi_nam vide_bit.</b> - <i>The poet is walking into the street. <u>Soon</u> he will see the queen.</i>'
						 + '<br><u>Ex.</u> <b class="Latin">Poe_ta i_ram viro_rum co_gita_bit, <u>mox</u> deo_rum.</b> - <i>The poet will ponder the anger of men, <u>then</u> of the gods.</i>'
						 + '</p>',
				type: 'conjunction',
				specialSyntax: null
			}),
			nunc: new Word({
				statement: 'nunc',
				definition: '(adv.) now',
				notes: null,
				type: 'adverb',
				specialSyntax: null
			}),
			semper: new Word({
				statement: 'semper',
				definition: '(adv.) always',
				notes: null,
				type: 'adverb',
				specialSyntax: null
			}),
			autem: new Word({
				statement: 'autem',
				definition: '(postpos. adv.) however; moreover',
				notes: null,
				type: 'adverb',
				specialSyntax: null
			}),
			etiam: new Word({
				statement: 'etiam',
				definition: '(adv.) even',
				notes: null,
				type: 'adverb',
				specialSyntax: null
			}),

		// LTRL Ch.4
			equidem: new Word({
				statement: 'equidem',
				definition: '(adv.) indeed, certainly; for my part',
				notes: '<p>Most often occurs with a verb in the first person (singular or plural) to emphasize a fact concerning oneself or to affirm one\'s own opinion. Even in the rare cases where it occurs with verbs in the second- or third-person, it usually has some reference to the writer\'s or speaker\'s own opinion.</p>',
				type: 'adverb',
				specialSyntax: null
			}),
			quidem: new Word({
				statement: 'quidem',
				definition: '(adv.) indeed, certainly; at least',
				notes: '<p>May <b>1.</b> emphasize an immediately preceding word or phrase (indeed, certainly); <b>2.</b> emphasize an entire setence (indeed, in fact); <b>3.</b> emphasize a word, phrase, or sentence as a concession (at least); or <b>4.</b> add a word, phrase, or sentence as a reinforcement or afterthought to something that precedes (and what is more, and...at that).</p>',
				type: 'adverb',
				specialSyntax: null
			}),

		// LTRL Ch.5
			bene: new Word({
				statement: 'bene',
				definition: '(adv.) well',
				notes: '',
				type: 'adverb',
				specialSyntax: null
			}),
			male: new Word({
				statement: 'male',
				definition: '(adv.) badly',
				notes: '<p>Includes the following range of meanings: "wickedly", "wrongfully"; "poorly", "scarcely"; inopportunely", "ill-advisedly"</p>',
				type: 'adverb',
				specialSyntax: null
			}),
			multum: new Word({
				statement: 'multum',
				definition: '(adv.) much, a lot',
				notes: '',
				type: 'adverb',
				specialSyntax: null
			}),
			sic: new Word({
				statement: 'si_c',
				definition: '(adv.) thus, so, in this way, in such a way',
				notes: '<p>Indicates that the action of the verb it modifies is being done in a manner that has just been indicated in a preceding clause or sentence, or is about to be indicated in a following clause or sentence.'
							 +'<br><u>Ex.</u> <b class="Latin">Si_c pugna_bant.</b> - <i>They were fighting in such a way (as I have just described).</i> or <i>They were fighting in such a way (as I shall now describe).</i>'
							 +'<br>Often used with the subordinating conjunction <b class="Latin">ut</b> to make comparisons. The subordinate clause introduced by <b class="Latin">ut</b> provides a <i>standard of comparison</i> for the main clause that includes <b class="Latin">si_c</b>.'
							 +'<br><u>Ex.</u> <b class="Latin">Ut agricola agro_s, si_c poe_ta verba co_gitat.</b> - <i> As a farmer ponders the fields, so a poet ponders words.</i>'
							 +'</p>',
				type: 'adverb',
				specialSyntax: null
			}),
			tamen: new Word({
				statement: 'tamen',
				definition: '(adv.) nevertheless',
				notes: '<p>Regularly ocurs in a main clause following a concessive clause. May also occur without an expressed concession in the preceding clause or sentence to indicate that the statement that includes it is true in spite of what has just been said.'
							 +'<br><u>Ex.</u> <b class="Latin">Quamquam bonam fa_mam opta_s, tamen cum incoli_s mali_s no_n pugna_s.</b> - <i>Although you desire a good reputation, nevertheless you are not fighting against the bad inhabitants.</i>'
							 +'<br><u>Ex.</u> <b class="Latin">Dominus no_n est in agri_s. Servus tamen cum di_ligentia_ labo_rat.</b> - <i>The master is not in the fields. Neverthess, the slave is working diligently.</i>'
							 +'</p>',
				type: 'adverb',
				specialSyntax: null
			}),
			ubi: new Word({
				statement: 'ubi',
				definition: '(conj.) when; (interrog. adv.) where, when (rel. adv.) where',
				notes: '<p>May be used as a subordinating conjunction (when) that introduces a temporal clause, or as an interrogative adverb (when, where) that introduces a question.'
								+'<br><u>Ex.</u> <b class="Latin">Ubi ad oppidum venit, labo_ra_re no_n optat.</b> - <i>When she comes to the town, she does not desire to work.</i>'
								+'<br><u>Ex.</u> <b class="Latin">Ubi veniet? Ubi est? Ubi est Ro_ma?</b> - <i>When will she come? Where is she? Where is Rome?</i>'
								+'</p>',
				type: 'adverb',
				specialSyntax: null
			}),

		// LTRL Ch.6
			umquam: new Word({
				statement: 'umquam',
				definition: '(adv.) ever',
				notes: null,
				type: 'adverb',
				specialSyntax: null
			}),
			numquam: new Word({
				statement: 'numquam',
				definition: '(adv.) never',
				notes: null,
				type: 'adverb',
				specialSyntax: null
			}),
			iure: new Word({
				statement: 'iu_re',
				definition: '(adv.) rightly, justly',
				notes: null,
				type: 'adverb',
				specialSyntax: null
			}),

		// LTRL Ch.7
			ante: new Word({
				statement: 'ante',
				definition: '(adv.) before, earlier, previously (prep. + acc.) before; in front of',
				notes: '<p>As an adverb, <b class="Latin">ante</b> most frequently has a temporal sense, but sometimes conveys the spatial sense of "ahead" or "in advance". As a preposition, it may have a temporal or a spatial sense.'
							+'<br><u>Ex:</u> <b class="Latin">Mi_lite_s ante ambula_bant.</b> - <i>The soldiers were walking ahead (in front).</i> (Adverb)'
							+'<br><u>Ex:</u> <b class="Latin">Verba poe_tae ante no_n intelle_xi_.</b> - <i>I did not understand the words of the poet before (previously).</i> (Adverb)'
							+'<br><u>Ex:</u> <b class="Latin">Nauta ante templum ambula_bat.</b> - <i>The sailor was walking in front of the temple.</i> (Preposition)'
							+'<br><u>Ex:</u> <b class="Latin">Ante bellum miseri_ erant incolae.</b> - <i>Before the war the inhabitants were miserable.</i> (Preposition)'
							+'</p>',
				type: 'adverb',
				specialSyntax: null
			}),
			etiam: new Word({
				statement: 'etiam',
				definition: '(adv.) also, even; still',
				notes: '<p>Derived from combination of adverbs <b class="Latin">et</b> and <b class="Latin">iam</b>. Adds a fact or thought to one already mentioned (also). That idea or thought is usually understood to be more important (even). When the additional thought is related to time, <b class="Latin">etiam</b> often means "still." It is most often placed immediately before the word indicating the fact or thought being added.'
							+'<br><u>Ex:</u> <b class="Latin">Disce_dam. No_n etiam time_bo_.</b> - <i>I shall depart. I shall not also fear.</i>'
							+'<br><u>Ex:</u> <b class="Latin">Etiam puero_s ex pro_vincia_ age_s?</b> - <i>Will you drive even the boys out of the province?</i>'
							+'<br><u>Ex:</u> <b class="Latin">Quoniam supera_visti_, viro_s interficere etiam opta_s?</b> - <i>Because you have conquered, do you still desire to kill the men?</i>'
							+'</p>',
				type: 'adverb',
				specialSyntax: null
			}),
			ita: new Word({
				statement: 'ita',
				definition: '(adv.) in this manner, thus, so',
				notes: '<p>May refer to what precedes or follows. Like <b class="Latin">si_c</b>, it may be used in comparisons to correlate with <b class="Latin">ut</b>.'
							+'<br><u>Ex:</u> <b class="Latin">No_n ita amo_ ut homine_s.</b> - <i>I do not love so as humans (do).</i>'
							+'<br>In answers, it is used for strong affirmation or negation.'
							+'<br><u>Ex:</u> <b class="Latin">Ita est.</b> - <i>It is so.</i>'
							+'<br><u>Ex:</u> <b class="Latin">No_n est ita.</b> - <i>It is not so.</i>'
							+'<br>In questions, it often adds a mocking or surprised tone and expects the answer "yes."'
							+'<br><u>Ex:</u> <b class="Latin">Itane est?</b> - <i>Is it so?</i>'
							+'</p>',
				type: 'adverb',
				specialSyntax: null
			}),
			ne: new Word({
				statement: 'ne_',
				definition: '(adv.) not; (conj.) (introduces negative Purpose clause) in order that...not; (introduces negative Indirect Command) that...not',
				notes: '<p>Used only in particular constructions with verbs in the subjunctive.</p>',
				type: 'adverb',
				specialSyntax: null
			}),
			post: new Word({
				statement: 'post',
				definition: '(adv.) after(ward), later; behind (prep. + acc.) after; behind',
				notes: '<p>As an adverb, most frequently has a temporal sense but sometimes has a spatial sense. As a preposition, may have a temporal or spatial sense.</p>',
				type: 'adverb',
				specialSyntax: null
			}),
			solum: new Word({
				statement: 'so_lum',
				definition: '(adv.) only',
				notes: '<p>Derived from the adjective <b class="Latin">so_lus, -a, -um</b> - <i>alone, only</i>.</p>',
				type: 'adverb',
				specialSyntax: null
			}),
			vero: new Word({
				statement: 've_ro_',
				definition: '(adv.) certainly, indeed; but (in fact)',
				notes: '<p>An irregular adverb derived from the adjective <b class="Latin">ve_rus, -a, -um</b>. Although it may mean "truly", it is more often used in answers to express agreement (certainly, indeed) <i>or</i> with mild adversative force to join two sentences (but [in truth]) and add an additional corroborating thought. In this second usage, it is always postpositive.'
							+'<br><u>Ex:</u> <b class="Latin">"Fuisti_ne in oppido_?" "Ve_ro_."</b> - <i>"Were you in the town?" "Indeed (I was)."</i>'
							+'<br><u>Ex:</u> <b class="Latin">Bonus poe_ta erat Catullus, magnus ve_ro_ Vergilius.</b> - <i>Catullus was a good poet, but (in truth) Vergil (was a) great (one).</i>'
							+'</p>',
				type: 'adverb',
				specialSyntax: null
			}),

		// LTRL Ch.8
			saepe: new Word({
				statement: 'saepe',
				definition: '(adv.) often',
				notes: null,
				type: 'adverb',
				specialSyntax: null
			}),
			quoque: new Word({
				statement: 'quoque',
				definition: '(adv.) also, too',
				notes: null,
				type: 'adverb',
				specialSyntax: null
			}),

		// LTRL Ch.9
			iam: new Word({
				statement: 'iam',
				definition: '(adv.) now; by now, by then, already',
				notes: null,
				type: 'adverb',
				specialSyntax: null
			}),
			'quam ob rem': new Word({
				statement: 'quam ob rem',
				definition: '(rel. or interrog. adv.) on account of which thing; therefore; why',
				notes: '<p>May be written as one word.</p>',
				type: 'adverb',
				specialSyntax: null
			}),
			quare: new Word({
				statement: 'qua_re_',
				definition: '(rel. adv.) because of which thing; therefore; why',
				notes: '<p>May be written as more than one word.</p>',
				type: 'adverb',
				specialSyntax: null
			}),
			tandem: new Word({
				statement: 'tandem',
				definition: '(adv.) finally, at last; (in questions and commands) pray, I ask you, then',
				notes: null,
				type: 'adverb',
				specialSyntax: null
			}),

		// LTRL Ch.10
			magnopere: new Word({
				statement: 'magnopere',
				definition: '(adv.) greatly',
				notes: '<p>In origin the Ablative of Manner <b class="Latin">magno_ opere</b>, and is sometimes written as two words.</p>',
				type: 'adverb',
				specialSyntax: null
			}),
			quo: new Word({
				statement: 'quo_',
				definition: '(rel. adv.) to where, whither',
				notes: null,
				type: 'adverb',
				specialSyntax: null
			}),
			unde: new Word({
				statement: 'unde',
				definition: '(rel. adv.) from where, whence',
				notes: null,
				type: 'adverb',
				specialSyntax: null
			}),
			contra: new Word({
				statement: 'contra_',
				definition: '(adv.) face to face; in opposition; in turn (prep. + acc.) facing; against, contrary to',
				notes: null,
				type: 'adverb',
				specialSyntax: null
			}),
			satis: new Word({
				statement: 'satis / sat',
				definition: '(indecl. n. subst.) enough (adv.) enough, sufficiently',
				notes: '<p>When an indeclinable neuter substantive, often followed by a Partitive Genitive.</p>',
				type: 'adverb',
				specialSyntax: null
			}),

		// LTRL Ch.11
			diu: new Word({
				statement: 'diu_',
				definition: '(adv.) for a long time',
				notes: '<p>Often appears in the phrase <b class="Latin">iam diu_</b> - "for a long time now." When this phrase occurs with a verb in the present tense, it indicates an action that has been going on for a long time and is still going on.</p>',
				type: 'adverb',
				specialSyntax: null
			}),
			longe: new Word({
				statement: 'longe_',
				definition: '(adv.) a long way, far; by far',
				notes: null,
				type: 'adverb',
				specialSyntax: null
			}),
			parum: new Word({
				statement: 'parum',
				definition: '(indecl. subst.) too little, not enough (adv.) too little, inadequately',
				notes: null,
				type: 'adverb',
				specialSyntax: null
			}),
			primum: new Word({
				statement: 'pri_mum',
				definition: '(adv.) first; for the first time',
				notes: null,
				type: 'adverb',
				specialSyntax: null
			}),
			quam: new Word({
				statement: 'quam',
				definition: '(adv.) as, how (conj.) than',
				notes: null,
				type: 'adverb',
				specialSyntax: null
			}),

		},

		pronouns: {

		// LTRL Ch.4
			ego: new Word({
				statement: 'ego_, mei_; no_s, nostrum / nostri_',
				definition: 'I, me; we, us',
				notes: '<p>'
							 + 'Nominative case forms of personal pronouns are most often used for added emphasis only.'
							 + '<br>Genitive forms of the first and second person personal pronouns may <i>only</i> be used for the <i>Objective</i> and <i>Partitive</i> Genitive. (To indicate possession, the corresponding possessive adjective is used.) When the genitive plural ends in <span class="Latin">-um</span>, it is Partitive, and in <span class="Latin">-i_</span>, Objective.'
							 + '<br>When a first or second person personal pronoun functions as an Ablative of Accompaniment, <span class="Latin">cum</span> is attached directly to the end, e.g. <span class="Latin">' + _('me_cum') + '</span> - <i>with me</i>, <span class="Latin">'+ _('no_bi_scum') + '</span> - <i>with us</i>.'
							 + '</p>',
				type: 'pronoun personal',
				specialSyntax: null
			}),
			tu: new Word({
				statement: 'tu_, tui_; vo_s, vestrum / vestri_',
				definition: 'you; you (pl.)',
				notes: '<p>'
							 + 'Nominative case forms of personal pronouns are most often used for added emphasis only.'
							 + '<br>Genitive forms of the first and second person personal pronouns may <i>only</i> be used for the <i>Objective</i> and <i>Partitive</i> Genitive. (To indicate possession, the corresponding possessive adjective is used.) When the genitive plural ends in <span class="Latin">-um</span>, it is Partitive, and in <span class="Latin">-i_</span>, Objective.'
							 + '<br>When a first or second person personal pronoun functions as an Ablative of Accompaniment, <span class="Latin">cum</span> is attached directly to the end, e.g. <span class="Latin">' + _('te_cum') + '</span> - <i>with you</i>, <span class="Latin">'+ _('vo_bi_scum') + '</span> - <i>with you (pl.)</i>.'
							 + '</p>',
				type: 'pronoun personal',
				specialSyntax: null
			}),
			is: new Word({
				statement: 'is, eius',
				definition: 'he, him; they',
				notes: '<p>'
								+ 'Nominative case forms of personal pronouns are most often used for added emphasis only.'
							 + 'The third person personal pronoun is in origin a <b>demonstrative adjective</b>, and it retains this use, e.g. <span class="">eum virum</span> - this (or that) man (d.o.), <span class="Latin">' + _('ea peri_cula') + '</span> - these (or those) dangers.'
							 + '<br> It has no corresponding possessive adjective, and its genitive singular and plural forms may be used as Genitives of Possession.'
							 + '</p>',
				type: 'pronoun personal',
				specialSyntax: null
			}),
			ea: new Word({
				statement: 'ea, eius',
				definition: 'she, her; they',
				notes: '<p>'
								+ 'Nominative case forms of personal pronouns are most often used for added emphasis only.'
							 + 'The third person personal pronoun is in origin a <b>demonstrative adjective</b>, and it retains this use, e.g. <span class="">eum virum</span> - this (or that) man (d.o.), <span class="Latin">' + _('ea peri_cula') + '</span> - these (or those) dangers.'
							 + '<br> It has no corresponding possessive adjective, and its genitive singular and plural forms may be used as Genitives of Possession.'
							 + '</p>',
				type: 'pronoun personal',
				specialSyntax: null
			}),
			id: new Word({
				statement: 'id, eius',
				definition: 'it; they',
				notes: '<p>'
								+ 'Nominative case forms of personal pronouns are most often used for added emphasis only.'
							 + 'The third person personal pronoun is in origin a <b>demonstrative adjective</b>, and it retains this use, e.g. <span class="">eum virum</span> - this (or that) man (d.o.), <span class="Latin">' + _('ea peri_cula') + '</span> - these (or those) dangers.'
							 + '<br> It has no corresponding possessive adjective, and its genitive singular and plural forms may be used as Genitives of Possession.'
							 + '</p>',
				type: 'pronoun personal',
				specialSyntax: null
			}),

		// LTRL Ch.5
			mei_: new Word({
				statement: '-, mei_; -, nostrum / nostri_',
				definition: 'myself; ourselves',
				notes: '<p>'
							 + 'A reflexive pronoun <i>bends back</i> - <span class="Latin">' + _('reflecto_') + '</span> (<i>bend back</i>) - or <i>refers to</i> the subject of the clause or sentence in which it appears, e.g. <i>I saw myself in the mirror</i>, <i>The women spoke among themselves</i>.'
							 + '<br>There are no nominative forms of the reflexive pronouns because reflexive pronouns <i>refer to but never are</i> the subjects of the clauses or sentences in which they appear.'
							 + '<br>The genitive forms of reflexive pronouns, like those of personal pronouns, can be used as <i>Partitive</i> or <i>Objective Genitives</i> only. For possession, the corresponding reflexive-possessive adjective is used.'
							 + '<br>When a reflexive pronoun functions as an Ablative of Accompaniment, <span class="Latin">cum</span> is attached directly to the end, e.g. <span class="Latin">' + _('me_cum') + '</span> - <i>with myself</i>, <span class="Latin">'+ _('no_bi_scum') + '</span> - <i>with ourselves</i>.'
							 + '</p>',
				type: 'pronoun reflexive',
				specialSyntax: null
			}),
			tui_: new Word({
				statement: '-, tui_; -, vestrum / vestri_',
				definition: 'yourself; yourselves',
				notes: '<p>'
							 + 'A reflexive pronoun <i>bends back</i> - <span class="Latin">' + _('reflecto_') + '</span> (<i>bend back</i>) - or <i>refers to</i> the subject of the clause or sentence in which it appears, e.g. <i>I saw myself in the mirror</i>, <i>The women spoke among themselves</i>.'
							 + '<br>There are no nominative forms of the reflexive pronouns because reflexive pronouns <i>refer to but never are</i> the subjects of the clauses or sentences in which they appear.'
							 + '<br>The genitive forms of reflexive pronouns, like those of personal pronouns, can be used as <i>Partitive</i> or <i>Objective Genitives</i> only. For possession, the corresponding reflexive-possessive adjective is used.'
							 + '<br>When a reflexive pronoun functions as an Ablative of Accompaniment, <span class="Latin">cum</span> is attached directly to the end, e.g. <span class="Latin">' + _('te_cum') + '</span> - <i>with yourself</i>, <span class="Latin">'+ _('vo_bi_scum') + '</span> - <i>with yourselves</i>.'
							 + '</p>',
				type: 'pronoun reflexive',
				specialSyntax: null
			}),
			sui_: new Word({
				statement: '-, sui_',
				definition: 'himself, herself, itself; themselves',
				notes: '<p>'
								+ 'A reflexive pronoun <i>bends back</i> - <span class="Latin">' + _('reflecto_') + '</span> (<i>bend back</i>) - or <i>refers to</i> the subject of the clause or sentence in which it appears, e.g. <i>I saw myself in the mirror</i>, <i>The women spoke among themselves</i>.'
								+ '<br>There are no nominative forms of the reflexive pronouns because reflexive pronouns <i>refer to but never are</i> the subjects of the clauses or sentences in which they appear.'
								+ '<br>The genitive forms of reflexive pronouns, like those of personal pronouns, can be used as <i>Partitive</i> or <i>Objective Genitives</i> only. For possession, the corresponding reflexive-possessive adjective is used.'
								+ '<br>When a reflexive pronoun functions as an Ablative of Accompaniment, <span class="Latin">cum</span> is attached directly to the end, e.g. <span class="Latin">' + _('se_cum') + '</span> - <i>with himself, with herself, with itself; with themselves</i>.'
								+ '<br>The alternate accusative and ablative forms <span class="Latin">' + _('se_') + '</span> and <span class="Latin">' + _('se_se_') + '</span> are interchangeable, although originally <span class="Latin">' + _('se_se_') + '</span> may have conveyed greater emphasis.'
								+ '</p>',
				type: 'pronoun reflexive',
				specialSyntax: null
			}),

		// LTRL Ch.9
			qui: new Word({
				statement: 'qui_, quae, quod',
				definition: '(rel. pron.) who, which, that',
				notes: null,
				type: 'pronoun relative',
				specialSyntax: null
			}),
			quis: new Word({
				statement: 'quis, quid',
				definition: '(interrog. pron.) who, what',
				notes: null,
				type: 'pronoun interrogative',
				specialSyntax: null
			}),

		// LTRL Ch.10
			quidam: new Word({
				statement: 'qui_dam, quaedam, quiddam',
				definition: '(indef. pron.) (a) certain person, (a) certain thing',
				notes: '<p>An <i>indefinite pronoun</i> is a pronoun that does not define or specify the person or thing for which it stands. <b class="Latin">qui_dam, quaedam, quiddam</b> is an indefinite pronoun formed by the addition of the suffix <b class="Latin">-dam</b> to the relative pronoun <b class="Latin">qui_, quae, quod</b>.</p>',
				type: 'pronoun indefinite',
				specialSyntax: null
			}),

		},

		interjections: {

		// LTRL Ch.1
			o: new Word({
				statement: 'o_',
				definition: '(interj.) O',
				notes: '', // *
				type: 'interjection',
				specialSyntax: '' // *
			}),

		// LTRL Ch. 8
			salve: new Word({
				statement: 'salve_ / salve_te',
				definition: '(interj.) hello! good day!',
				notes: null,
				type: 'interjection',
				specialSyntax: null
			}),
			vale: new Word({
				statement: 'vale_ / vale_te',
				definition: '(interj.) greetings! farewell!',
				notes: null,
				type: 'interjection',
				specialSyntax: null
			}),
			ecce: new Word({
				statement: 'ecce',
				definition: '(interj.) lo! behold! look!',
				notes: null,
				type: 'interjection',
				specialSyntax: null
			}),
			hercule: new Word({
				statement: 'herc(u)le',
				definition: '(interj.) by Hercules!',
				notes: null,
				type: 'interjection',
				specialSyntax: null
			}),
			mehercule: new Word({
				statement: 'mehercule / mehercule_s',
				definition: '(interj.) by Hercules!',
				notes: null,
				type: 'interjection',
				specialSyntax: null
			}),
			heu: new Word({
				statement: 'heu',
				definition: '(interj.) alas! oh!',
				notes: null,
				type: 'interjection',
				specialSyntax: null
			}),

		},

		idioms: {

			// LTRL Ch.2
				'poenas dare': new Word({
					statement: 'poena_s dare',
					definition: '(idiom) to pay the penalty',
					notes: null,
					type: 'idiom',
					specialSyntax: null
				}),
				'vela dare': new Word({
					statement: 've_la dare',
					definition: '(idiom) to set sail',
					notes: null,
					type: 'idiom',
					specialSyntax: null
				}),

			// LTRL Ch.3
				'causam agere': new Word({
					statement: 'causam agere',
					definition: '(idiom) to conduct or plead a case',
					notes: null,
					type: 'idiom',
					specialSyntax: null
				}),
				'consilium capere': new Word({
					statement: 'co_nsilium capere',
					definition: '(idiom) to form a plan',
					notes: null,
					type: 'idiom',
					specialSyntax: null
				}),
				'bellum gerere': new Word({
					statement: 'bellum gerere',
					definition: '(idiom) to wage war',
					notes: null,
					type: 'idiom',
					specialSyntax: null
				}),

			// LTRL Ch.6
				'patres conscripti': new Word({
					statement: 'patre_s co_nscri_pti_',
					definition: '(idiom) (voc. pl.) enrolled fathers, senators',
					notes: '<p>A frequent appelation for the collective Roman senate. The word <b class="Latin">patre_s</b> alone may also be used to mean "senators."</p>',
					type: 'idiom',
					specialSyntax: null
				}),

			// LTRL Ch.8
				'res gestae': new Word({
					statement: 're_s gestae, re_rum gesta_rum',
					definition: '(idiom) accomplishments; history',
					notes: '<p>Literally, "things [having been] accomplished."</p>',
					type: 'idiom',
					specialSyntax: null
				}),
				'res novae': new Word({
					statement: 're_s novae, re_s nova_rum',
					definition: '(idiom) revolution',
					notes: '<p>Literally, "new things."</p>',
					type: 'idiom',
					specialSyntax: null
				}),
				'res publica': new Word({
					statement: 're_s pu_blica, rei_ pu_blicae',
					definition: '(idiom) republic',
					notes: '<p>Literally, "public property" or "commonwealth."</p>',
					type: 'idiom',
					specialSyntax: null
				}),
				'salutem dicere': new Word({
					statement: 'salu_tem di_cere',
					definition: '(idiom) to say "greetings," to say hello',
					notes: '',
					type: 'idiom',
					specialSyntax: null
				}),

			// LTRL Ch.9
				'quo modo': new Word({
					statement: 'quo_ modo_',
					definition: '(idiom) in what manner, how',
					notes: '<p><b class="Latin">quo_</b> is an interrogative adjective and <b class="Latin">quo_ modo_</b> is an Ablative of Manner.</p>',
					type: 'idiom',
					specialSyntax: null
				}),
				'legem ferre': new Word({
					statement: 'le_gem ferre',
					definition: '(idiom) to pass a law',
					notes: null,
					type: 'idiom',
					specialSyntax: null
				}),

			// LTRL Ch.10
				'opus est': new Word({
					statement: 'opus est',
					definition: '(idiom) there is a need of (+ abl. or nom.)',
					notes: '<p>Most often takes an ablative to express the thing needed; sometimes takes a nominative (subject), and rarely takes a genitive. Commonly occurs with a Dative of Reference.</p>',
					type: 'idiom',
					specialSyntax: null
				}),
				'orationem habere': new Word({
					statement: 'o_ra_tio_nem habe_re',
					definition: '(idiom) to make a speech',
					notes: '<p></p>',
					type: 'idiom',
					specialSyntax: null
				}),

			// LTRL Ch.11
				'prima luce': new Word({
					statement: 'pri_ma_ lu_ce',
					definition: '(idiom) at daybreak',
					notes: '<p>(an Ablative of Time When)</p>',
					type: 'idiom',
					specialSyntax: null
				}),
				'castra ponere': new Word({
					statement: 'castra po_nere',
					definition: '(idiom) to pitch / make camp',
					notes: '<p></p>',
					type: 'idiom',
					specialSyntax: null
				}),
				'castra movere': new Word({
					statement: 'castra move_re',
					definition: '(idiom) to break camp',
					notes: '<p></p>',
					type: 'idiom',
					specialSyntax: null
				}),
				'quam primum': new Word({
					statement: 'quam pri_mum',
					definition: '(idiom) as soon as possible',
					notes: '<p></p>',
					type: 'idiom',
					specialSyntax: null
				}),


			// Wheelock Ch.1
				'amabo te': new Word({
					statement: 'ama_bo_ te_',
					definition: '(idiom) please',
					notes: '<p>Literally \'I will love you.\'</p>',
					type: 'idiom',
					specialSyntax: null
				}),

		},

		other: {

		// LTRL Ch.1
			'et...et...': new Word({
				statement: 'et...et...',
				definition: 'both...and...',
				notes: '<p>When the chain is longer than two, it can be translated by dropping the word <i>both</i>: <i>..., and ..., and ..., ...</i>.</p>',
				type: 'other',
				specialSyntax: null
			}),

		// LTRL Ch.2
			'nec...nec...': new Word({
				statement: 'neque/nec...neque/nec...',
				definition: 'neither...nor...',
				notes: '<p>When the chain is longer than two, it can be translated as <i>not ..., and not ..., and not ..., ...</i>.</p>', // *
				type: 'other',
				specialSyntax: null
			}),
			'-ne': new Word({
				statement: '-ne',
				definition: '(interrog. enclitic particle) (added to the first word of a question)',
				notes: '<p>'
								+ 'Its usage in questions is <i>optional</i>, and it has no English translation.'
								+ '</p>',
				type: 'other',
				specialSyntax: null
			}),

		// LTRL Ch.4
			'ne...quidem': new Word({
				statement: 'ne_...quidem',
				definition: 'not even',
				notes: null,
				type: 'other',
				specialSyntax: null
			}),

		// LTRL Ch.7
			utinam: new Word({
				statement: 'utinam',
				definition: '(particle) introduces an Optative subjunctive',
				notes: null,
				type: 'other',
				specialSyntax: null
			}),
			'aut...aut...': new Word({
				statement: 'aut...aut...',
				definition: 'either...or...',
				notes: '<p>When the series is longer than two, the "either" is omitted from the translation.</p>',
				type: 'other',
				specialSyntax: null
			}),
			'non solum...sed': new Word({
				statement: 'no_n so_lum...sed/ve_rum etiam...',
				definition: 'not only...but also...',
				notes: '<p><b class="Latin">ve_rum</b> is a conjunction derived from the adjective <b class="Latin">ve_rus, -a, -um</b> and means "but." It introduces a sentence or phrase that agrees with what has been said but adds a qualification.'
								+'<br><u>Ex:</u> <b class="Latin">Crassus inimi_co_s no_n so_lum pecu_nia_ ve_rum etiam gladio_ supera_vit.</b> - <i>Crassus overcame (his) enemies not only by money but also by the sword.</i>'
								+'</p>',
				type: 'other',
				specialSyntax: null
			}),

		},

		syntax: {

		// LTRL Ch.1
			'Nominative, Subject': new Word({
				statement: '',
				definition: 'Nominative, Subject',
				notes: '<p>'
								+ 'A nominative used to identify the Subject (that which is spoken about) of a verb.'
								+ '<br>Ex. <i><u>John</u> is a waiter.</i>'
								+ '</p>', // *
				type: 'syntax',
				specialSyntax: ''
			}),
			'Predicate Nominative': new Word({
				statement: '',
				definition: 'Predicate Nominative',
				notes: '<p>'
								+ 'A nominative used to express an element that is <i>equivalent to</i> to the subject and is joined to it by a <i>linking</i> or <i>copulative</i> verb.'
								+ '<br>Ex. <i>John is a <u>waiter</u>.</i>'
								+'</p>',
				type: 'syntax',
				specialSyntax: ''
			}),
			'Genitive of Possession' : new Word({
				statement: '',
				definition: 'Genitive of Possession',
				notes: '<p>'
								+ 'A genitive used to express a person or thing who <i>owns</i> or <i>possesses</i> another noun.'
								+ '<br>Ex. <i>The book <u>of the girl</u>.</i>'
								+ '</p>',
				type: 'syntax',
				specialSyntax: ''
			}),
			'Dative of Reference' : new Word({
				statement: '',
				definition: 'Dative of Reference',
				notes: '<p>'
								+ 'A dative used to xpress a person or thing <i>with reference to whom</i> the action of the verb occurs.'
								+ '<br>Ex. <i><u>To the sailor</u>, the danger of the sea is real</i>.'
								+'</p>',
				type: 'syntax',
				specialSyntax: ''
			}),
			'Dative of Indirect Object' : new Word({
				statement: '',
				definition: 'Dative of Indirect Object',
				notes: '<p>'
								+ 'A dative used to expresses the person or thing <i>indirectly</i> interested in the action of the verb. Most often occurs with verbs of <i>giving</i>, <i>showing</i>, or <i>telling</i>.'
								+ '<br>Ex. <i>The girl gives a toy <u>to the cat</u>.</i>'
								+ '<br>Ex. <i>The girl gives <u>the cat</u> a toy.</i></i>'
								+'</p>',
				type: 'syntax',
				specialSyntax: ''
			}),
			'Accusative, Direct Object' : new Word({
				statement: '',
				definition: 'Accusative, Direct Object',
				notes: '<p>'
								+'An accusative used to express the person or thing <i>receiving the action of the verb</i>.'
								+'<br>Ex. <i>The poet writes <u>poems</u>.</i>'
								+'</p>',
				type: 'syntax',
				specialSyntax: ''
			}),
			'Ablative of Accompaniment' : new Word({
				statement: '',
				definition: 'Ablative of Accompaniment',
				notes: '<p>'
								+ 'An ablative used to express the person (occasionally the thing) that <i>accompanies</i> another noun in the sentence. <br><i>Always</i> uses the preposition <b class="Latin">cum</b>.'
								+ '<br>Ex. <i>The woman came to the party <u>with a poet</u>.</i>'
								+'</p>',
				type: 'syntax',
				specialSyntax: ''
			}),
			'Ablative of Means' : new Word({
				statement: '',
				definition: 'Ablative of Means',
				notes: '<p>'
								+ 'An ablative used to express the <i>thing by means of which</i> an action is performed. <br><i>Never</i> uses a preposition.'
								+ '<br>Ex. <i>The farmer is fighting <u>with a sword</u>.</i>'
								+ '</p>',
				type: 'syntax',
				specialSyntax: ''
			}),

		// LTRL Ch.2
			'Complementary Infinitive': new Word({
				statement: '',
				definition: 'Complementary Infinitive',
				notes: '<p>'
								+ 'An infinitive used to <i>complete</i> the meaning of another verb.'
								+ '<br>Ex. <b class="Latin">' + _('I_nsulam vide_re possum.') + '</b> - <i>I am able <u>to see</u> the island.</i>'
								+ '</p>',
				type: 'syntax',
				specialSyntax: ''
			}),
			'Object Infinitive': new Word({
				statement: '',
				definition: 'Object Infinitive',
				notes: '<p>'
								+ 'An infinitive used as the <i>direct object</i> of another verb.'
								+ '<br>Ex. <b class="Latin">' + _('Agricola labo_ra_re optat.') + '</b> - <i>The farmer desires <u>to work</u>.</i>'
								+ '</p>',
				type: 'syntax',
				specialSyntax: ''
			}),
			'Dative of the Possessor': new Word({
				statement: '',
				definition: 'Dative of the Possessor',
				notes: '<p>'
								+ 'A dative used to indicate the person who possesses something.'
								+ '<br>Ex. <b class="Latin">' + _('Domino_ est liber.') +'</b> - <i> <u>To the master</u> there is a book. (The master has a book.)</i>'
								+ '<br>In a sentence containing a Dative of the Possessor, the noun <i>possessed</i> appears in the nominative case as the subject of a form of the verb <b class="Latin">sum</b>. In the above example, the book <i>is</i> to the master. The Dative of the Possessor is <i>always</i> a person.'
								+ '</p>',
				type: 'syntax',
				specialSyntax: ''
			}),

		// LTRL Ch.3
			'Substantive': new Word({
				statement: '',
				definition: 'Substantive',
				notes: '<p>'
								+ 'An adjective used as a noun - the translation must indicate gender and number.'
								+ '<br>Ex. <b class="Latin">Multa videt.</b> - <i>He sees <u>many things</u>.</i>'
								+ '<br>Ex. <b class="Latin">Laetus bonam amat.</b> - <i><u>The happy man</u> loves <u>the good woman</u>.</i>'
								+ '<br>The substantive use of the masculine plural <i>may</i> refer to groups of mixed gender.'
								+ '</p>',
				type: 'syntax',
				specialSyntax: ''
			}),
			'Predicate Adjective': new Word({
				statement: '',
				definition: 'Predicate Adjective',
				notes: '<p>'
								+ 'An adjective that appears with a copulative verb. Agrees with the noun it modifies in gender, number, and case.'
								+ '<br>Ex. <b class="Latin">'+_('Cla_rus est poe_ta')+'.</b> - <i>The poet is <u>famous</u>.</i>'
								+ '<br>Ex. <b class="Latin">'+_('Puero_s iube_bo_ esse bono_s')+'.</b> - <i>I shall order the boys to be <u>good</u>.</i>'
								+ '</p>',
				type: 'syntax',
				specialSyntax: ''
			}),
			'Ablative of Personal Agent': new Word({
				statement: '',
				definition: 'Ablative of Personal Agent',
				notes: '<p>'
								+ 'An ablative used to express the person or agent by whom an action is performed. It occurs with verbs in the passive voice and <u>requires</u> the preposition <b class="Latin">' + _('a_ / ab') + '</b>.'
								+ '<br>Ex. <b class="Latin">' + _('Fi_lius <u>a_ re_gi_na_</u> voca_ba_tur.<u></u>') + '</b> - <i>The son was being summoned <u>by the queen</u></i>.'
								+ '</p>',
				type: 'syntax',
				specialSyntax: ''
			}),
			'Ablative of Manner': new Word({
				statement: '',
				definition: 'Ablative of Manner',
				notes: '<p>'
								+ 'An ablative used to express the way or manner in which an action is performed. It requires <b class="Latin">cum</b> when <i>not</i> modified by an adjective. It does not require <b class="Latin">cum</b> when it <i>is</i> modified by an adjective.'
								+ '<br>Ex. <b class="Latin">' + _('<u>Cum di_ligentia_</u> labo_rat.') + '</b> - <i>She works <u>with diligence</u>. (She works <u>diligently</u>.)</i>'
								+ '<br>Ex. <b class="Latin">' + _('<u>Magna_ (cum)</u> di_ligentia_ labo_rat.') + '</b> - <i>She works <u>with great diligence</u>.</i>'
								+ '<br>Note that when cum appears with an ablative of manner that is modified by an adjective, it is usually placed between the adjective and the ablative, as it is the least important element of the phrase (preposition), and greater balance of the important elements (noun and adjective) is achieved. - <i>This is according to Keller and Russell.</i>'
								+ '</p>',
				type: 'syntax',
				specialSyntax: ''
			}),
			'Subject Infinitive': new Word({
				statement: '',
				definition: 'Subject Infinitive',
				notes: '<p>'
								+ 'An infinitive (neuter singular verbal noun) used as the <i>subject</i> of another verb.'
								+ '<br>Ex. <b class="Latin">Bonum est ' + _('<u>labo_ra_re</u>') + '</b> - <i><u>To work</u> is good. (It is good to work.) (Working is good.)</i>.'
								+ '</p>',
				type: 'syntax',
				specialSyntax: ''
			}),
			'Appositive': new Word({
				statement: '',
				definition: 'Appositive',
				notes: '<p>'
								+ 'A noun that defines or limits another noun next to which it is placed. It always agrees with the noun it defines in case.'
								+ '<br>Ex. '+_('<b class="Latin">Hora_tius, poe_ta <u>magnus</u>, multo_s libro_s habet.</b>')+' - <i>Horace, the great <u>poet</u>, has many books.</i>'
								+ '</p>',
				type: 'syntax',
				specialSyntax: ''
			}),

		// LTRL Ch.4
			'Partitive Genitive': new Word({
				statement: '',
				definition: 'Partitive Genitive',
				notes: '<p>'
								+ 'A genitive that represents the <i>whole</i> out of which another noun is a <i>part</i>.'
								+ '<br>Ex. <b class="Latin">Multi_ ' + '<u>agrico_la_rum</u>' + ' no_n labo_ra_bant.</b> - <i>Many <u>of the farmers</u> were not working.</i>'
								+ '</p>',
				type: 'syntax',
				specialSyntax: ''
			}),
			'Subjective Genitive': new Word({
				statement: '',
				definition: 'Subjective Genitive',
				notes: '<p>'
								+ 'A genitive that expresses the person or thing <i>performing</i> the verbal action implied in another noun.'
								+ '<br>Ex. <b class="Latin">Magnum erat odium <u>Sullae</u> in Ro_ma_no_s.</b> - <i>Great was the hatred <u>of Sulla</u> against the Romans.</i>'
								+ '</p>',
				type: 'syntax',
				specialSyntax: ''
			}),
			'Objective Genitive': new Word({
				statement: '',
				definition: 'Objective Genitive',
				notes: '<p>'
								+ 'A genitive that expresses the person or thing <i>receiving</i> the verbal action implied in another noun. May be translated with English "for".'
								+ '<br>Ex. <b class="Latin">Re_gi_na odium <u>populi_</u> habet.</b> - <i>The queen has hatred <u>of (for) the people</u>.</i>'
								+ '</p>',
				type: 'syntax',
				specialSyntax: ''
			}),
			'Ablative of Respect': new Word({
				statement: '',
				definition: 'Ablative of Respect',
				notes: '<p>'
								+ 'An ablative that limits or specifies the meaning of an adjective or verb. No preposition is used.'
								+ '<br>Ex. <b class="Latin">Magnus <u>co_nsilio_</u> erat poe_ta.</b> - <i>The poet was great <u>in (respect to)</u> judgement.</i>'
								+ '</p>',
				type: 'syntax',
				specialSyntax: ''
			}),

		// LTRL Ch.6
			'Ablative of Separation': new Word({
				statement: '',
				definition: 'Ablative of Separation',
				notes: '<p>'
								+ ''
								+ '</p>',
				type: 'syntax',
				specialSyntax: ''
			}),
			'Ablative of Cause': new Word({
				statement: '',
				definition: 'Ablative of Cause',
				notes: '<p>'
								+ ''
								+ '</p>',
				type: 'syntax',
				specialSyntax: ''
			}),
			'Ablative of Place From Which': new Word({
				statement: '',
				definition: 'Ablative of Place From Which',
				notes: '<p>'
								+ ''
								+ '</p>',
				type: 'syntax',
				specialSyntax: ''
			}),
			'Ablative of Place Where': new Word({
				statement: '',
				definition: 'Ablative of Place Where',
				notes: '<p>'
								+ ''
								+ '</p>',
				type: 'syntax',
				specialSyntax: ''
			}),
			'Accusative of Place To Which': new Word({
				statement: '',
				definition: 'Accusative of Place To Which',
				notes: '<p>'
								+ ''
								+ '</p>',
				type: 'syntax',
				specialSyntax: ''
			}),

		// LTRL Ch.7
			'Dative of Purpose': new Word({
				statement: '',
				definition: 'Accusative of Place To Which',
				notes: '<p>'
								+ ''
								+ '</p>',
				type: 'syntax',
				specialSyntax: ''
			}),
			'Dative of Advantage/Disadvantage': new Word({
				statement: '',
				definition: 'Accusative of Place To Which',
				notes: '<p>'
								+ ''
								+ '</p>',
				type: 'syntax',
				specialSyntax: ''
			}),

		}

	};

// Decks
	var decks = {
		chapterOne: {
			title: 'LTRL Ch 1',
			deck: [
				V.nouns.agricola,
				V.nouns.anima,
				V.nouns.dea,
				V.nouns.fama,
				V.nouns.femina,
				V.nouns.filia,
				V.nouns.insula,
				V.nouns.Italia,
				V.nouns.nauta,
				V.nouns.patria,
				V.nouns.pecunia,
				V.nouns.poeta,
				V.nouns.puella,
				V.nouns.regina,
				V.nouns.via,
				V.nouns.ager,
				V.nouns.deus,
				V.nouns.dominus,
				V.nouns.filius,
				V.nouns.gladius,
				V.nouns.liber,
				V.nouns.puer,
				V.nouns.servus,
				V.nouns.vir,
				V.nouns.aurum,
				V.nouns.bellum,
				V.nouns.consilium,
				V.nouns.donum,
				V.nouns.factum,
				V.nouns.ferrum,
				V.nouns.oppidum,
				V.nouns.periculum,
				V.nouns.verbum,
				V.prepositions.ab,
				V.prepositions.ad,
				V.prepositions.cum,
				V.prepositions.de,
				V.prepositions.ex,
				V.conjunctions.et,
				V.adverbs.et,
				V.other['et...et...'],
				V.prepositions.in,
				V.interjections.o,
				V.conjunctions['-que']
			]
		},
		chapterTwo: {
			title: 'LTRL Ch 2',
			deck: [
				V.nouns.cura,
				V.nouns.ira,
				V.nouns.poena,
				V.nouns.sapientia,
				V.nouns.vita,
				V.nouns.animus,
				V.nouns.arma,
				V.nouns.studium,
				V.nouns.velum,
				V.verbs.ambulo,
				V.verbs.amo,
				V.verbs.cogito,
				V.verbs.do,
				V.idioms['poenas dare'],
				V.idioms['vela dare'],
				V.verbs.dono,
				V.verbs.erro,
				V.verbs.laboro,
				V.verbs.monstro,
				V.verbs.opto,
				V.verbs.voco,
				V.verbs.debeo,
				V.verbs.habeo,
				V.verbs.iubeo,
				V.verbs.moveo,
				V.verbs.respondeo,
				V.verbs.timeo,
				V.verbs.video,
				V.verbs.sum,
				V.verbs.possum,
				V.adverbs.cur,
				V.conjunctions.enim,
				V.conjunctions.etenim,
				V.conjunctions.nam,
				V.conjunctions.namque,
				V.other['-ne'],
				V.adverbs.neque,
				V.other['nec...nec...'],
				V.adverbs.non,
				V.conjunctions.sed
			]
		},
		chapterThree: {
			title: 'LTRL Ch 3',
			deck: [
				V.nouns.diligentia,
				V.nouns.incola,
				V.nouns.mora,
				V.nouns.provincia,
				V.nouns.terra,
				V.nouns.amicus,
				V.nouns.forum,
				V.nouns.imperium,
				V.nouns.inimicus,
				V.nouns.odium,
				V.nouns.populus,
				V.nouns.Romani,
				V.nouns.nihil,
				V.verbs.laudo,
				V.verbs.pugno,
				V.verbs.supero,
				V.verbs.teneo,
				V.verbs.video,
				V.verbs.eo,
				V.adjectives.amicus,
				V.adjectives.inimicus,
				V.adjectives.bonus,
				V.adjectives.laetus,
				V.adjectives.liber,
				V.adjectives.magnus,
				V.adjectives.malus,
				V.adjectives.miser,
				V.adjectives.multus,
				V.adjectives.parvus,
				V.adjectives.pulcher,
				V.adjectives.Romanus,
				V.prepositions.ab,
				V.conjunctions.atque,
				V.adverbs.mox,
				V.adverbs.nunc,
				V.prepositions.pro,
				V.prepositions.propter,
				V.adverbs.semper,
				V.prepositions.sine,
				V.adverbs.autem,
				V.adjectives.humanus,
				V.verbs.ignosco,
				V.adverbs.etiam,
				V.adverbs.saepe,
				V.prepositions.sub,
				V.nouns.palliolum,
				V.adjectives.sordidus,
				V.adjectives.mutuus,
				V.nouns.acervus,
				V.verbs.apto,
				V.verbs.conicio,
				V.verbs.recipero,
				V.nouns.sarcina
			]
		},
		chapterFour: {
			title: 'LTRL Ch 4',
			deck: [
				V.nouns.causa,
				V.nouns.gloria,
				V.nouns.invidia,
				V.nouns.sententia,
				V.nouns.altum,
				V.nouns.auxilium,
				V.nouns.auxilia,
				V.nouns.caelum,
				V.nouns.socius,
				V.verbs.ago,
				V.idioms['causam agere'],
				V.verbs.cano,
				V.verbs.capio,
				V.idioms['consilium capere'],
				V.verbs.dico,
				V.verbs.duco,
				V.verbs.facio,
				V.verbs.gero,
				V.idioms['bellum gerere'],
				V.verbs.mitto,
				V.verbs.pono,
				V.verbs.rego,
				V.verbs.scribo,
				V.verbs.audio,
				V.verbs.sentio,
				V.verbs.venio,
				V.pronouns.ego,
				V.pronouns.tu,
				V.pronouns.is,
				V.pronouns.ea,
				V.pronouns.id,
				V.adjectives.meus,
				V.adjectives.noster,
				V.adjectives.tuus,
				V.adjectives.vester,
				V.adjectives.altus,
				V.adjectives.clarus,
				V.adjectives.cupidus,
				V.adjectives.decem,
				V.adjectives.socius,
				V.adjectives.validus,
				V.adverbs.equidem,
				V.adverbs.quidem,
				V.other['ne...quidem'],
				V.prepositions.per
			]
		},
		chapterFive: {
			title: 'LTRL Ch 5',
			deck: [
				V.nouns.amicitia,
				V.nouns.inimicitia,
				V.nouns.fatum,
				V.nouns.proelium,
				V.verbs.accipio,
				V.verbs.cedo,
				V.verbs.accedo,
				V.verbs.discedo,
				V.verbs.interficio,
				V.verbs.perficio,
				V.verbs.abeo,
				V.verbs.fero,
				V.verbs.memini,
				V.verbs.odi,
				V.verbs.redeo,
				V.pronouns.mei_,
				V.pronouns.tui_,
				V.pronouns.sui_,
				V.adjectives.mea,
				V.adjectives.tua,
				V.adjectives.nostra,
				V.adjectives.vestra,
				V.adjectives.suus,
				V.adjectives.ipse,
				V.adjectives.durus,
				V.adjectives.pius,
				V.adjectives.impius,
				V.adverbs.bene,
				V.adverbs.male,
				V.adverbs.multum,
				V.adverbs.sic,
				V.adverbs.tamen,
				V.conjunctions.etsi,
				V.conjunctions.nisi,
				V.conjunctions.postquam,
				V.conjunctions.quamquam,
				V.conjunctions.quoniam,
				V.conjunctions.si,
				V.conjunctions.ubi,
				V.conjunctions.ut
			]
		},
		chapterSix: {
			title: 'LTRL Ch 6',
			deck: [
				V.nouns.Athenae,
				V.nouns.natura,
				V.nouns.Roma,
				V.nouns.dictum,
				V.nouns.domus,
				V.nouns.amor,
				V.nouns.animal,
				V.nouns.carmen,
				V.nouns.Carthago,
				V.nouns.civis,
				V.nouns.corpus,
				V.nouns.frater,
				V.nouns.homo,
				V.nouns.hostis,
				V.nouns.ius,
				V.nouns.mare,
				V.nouns.mater,
				V.nouns.mens,
				V.nouns.miles,
				V.nouns.moenia,
				V.nouns.pater,
				V.nouns.rex,
				V.nouns.rus,
				V.nouns.servitus,
				V.nouns.soror,
				V.nouns.timor,
				V.nouns.urbs,
				V.nouns.vis,
				V.verbs.libero,
				V.verbs.careo,
				V.verbs.lego,
				V.verbs.intellego,
				V.verbs.vivo,
				V.adjectives.antiquus,
				V.adjectives.novus,
				V.adjectives.pauci,
				V.conjunctions.autem,
				V.prepositions.inter,
				V.prepositions.sub,
				V.adverbs.umquam,
				V.adverbs.numquam,
				V.idioms['patres conscripti'],
				V.adverbs.iure
			]
		},
		chapterSeven: {
			title: 'LTRL Ch 7',
			deck: [
				V.nouns.ara,
				V.nouns.copia,
				V.nouns.fortuna,
				V.nouns.insidiae,
				V.nouns.umbra,
				V.nouns.ingenium,
				V.nouns.templum,
				V.nouns.ars,
				V.nouns.civitas,
				V.nouns.mors,
				V.nouns.pars,
				V.nouns.virtus,
				V.nouns.vox,
				V.verbs.maneo,
				V.verbs.terreo,
				V.verbs.cupio,
				V.verbs.fugio,
				V.verbs.peto,
				V.verbs.trado,
				V.verbs.vinco,
				V.verbs.aufero,
				V.verbs.differo,
				V.adjectives.acerbus,
				V.adjectives.carus,
				V.adjectives.certus,
				V.adjectives.incertus,
				V.adjectives.falsus,
				V.adjectives.verus,
				V.adverbs.ante,
				V.adverbs.etiam,
				V.adverbs.ita,
				V.adverbs.ne,
				V.adverbs.post,
				V.adverbs.solum,
				V.adverbs.vero,
				V.conjunctions.aut,
				V.conjunctions.verum,
				V.other.utinam,
				V.other['aut...aut...'],
				V.other['non solum...sed']
			]
		},
		chapterEight: {
			title: 'LTRL Ch 8',
			deck: [
				V.interjections.salve,
				V.interjections.vale,
				V.interjections.ecce,
				V.interjections.hercule,
				V.interjections.mehercule,
				V.interjections.heu,
				V.nouns.salus,
				V.idioms['salutem dicere'],
				V.verbs.valeo,
				V.nouns.fuga,
				V.nouns.annus,
				V.nouns.locus,
				V.nouns.consul,
				V.nouns.nox,
				V.nouns.tempus,
				V.nouns.consulatus,
				V.nouns.domus4,
				V.nouns.exercitus,
				V.nouns.manus,
				V.nouns.motus,
				V.nouns.senatus,
				V.nouns.acies,
				V.nouns.dies,
				V.nouns.fides,
				V.nouns.res,
				V.idioms['res gestae'],
				V.idioms['res novae'],
				V.idioms['res publica'],
				V.nouns.species,
				V.adjectives.publicus,
				V.adjectives.acer,
				V.adjectives.facilis,
				V.adjectives.difficilis,
				V.adjectives.felix,
				V.adjectives.infelix,
				V.adjectives.fortis,
				V.adjectives.ingens,
				V.adjectives.omnis,
				V.adjectives.hic,
				V.adjectives.iste,
				V.adjectives.ille,
				V.verbs.conor,
				V.verbs.fateor,
				V.verbs.sequor,
				V.verbs.morior,
				V.verbs.experior,
				V.verbs.audeo,
				V.verbs.relinquo,
				V.adverbs.quoque,
				V.adverbs.saepe
			]
		},
		chapterNine: {
			title: 'LTRL Ch 9',
			deck: [
				V.nouns.exsilium,
				V.nouns.modus,
				V.idioms['quo modo'],
				V.nouns.oculus,
				V.nouns.lex,
				V.idioms['legem ferre'],
				V.nouns.libertas,
				V.nouns.pax,
				V.nouns.metus,
				V.nouns.spes,
				V.pronouns.qui,
				V.adjectives.qui,
				V.pronouns.quis,
				V.verbs.hortor,
				V.verbs.impero,
				V.verbs.moneo,
				V.verbs.pareo,
				V.verbs.placeo,
				V.verbs.patior,
				V.verbs.pello,
				V.verbs.quaero,
				V.adjectives.caecus,
				V.adjectives.gravis,
				V.adjectives.levis,
				V.adjectives.alius,
				V.adjectives.alter,
				V.adjectives.idem,
				V.adjectives.neuter,
				V.adjectives.nullus,
				V.adjectives.solus,
				V.adjectives.totus,
				V.adjectives.ullus,
				V.adjectives.unus,
				V.adjectives.uter,
				V.adverbs.iam,
				V.adverbs.tandem,
				V.adverbs['quam ob rem'],
				V.adverbs.quare,
				V.prepositions.ob,
				V.conjunctions.ne,
				V.conjunctions.ut
			]
		},
		chapterTen: {
			title: 'LTRL Ch 10',
			deck:  [
				V.nouns.legatus,
				V.nouns.natus,
				V.nouns.dux,
				V.nouns.finis,
				V.nouns.genus,
				V.nouns.labor,
				V.nouns.mos,
				V.nouns.nemo,
				V.nouns.opus,
				V.idioms['opus est'],
				V.nouns.oratio,
				V.idioms['orationem habere'],
				V.nouns.orator,
				V.nouns.pectus,
				V.nouns.casus,
				V.pronouns.quidam,
				V.adjectives.quidam,
				V.verbs.oppugno,
				V.verbs.servo,
				V.verbs.sto,
				V.verbs.deleo,
				V.verbs.cado,
				V.verbs.nascor,
				V.verbs.nosco,
				V.verbs.cognosco,
				V.verbs.proficiscor,
				V.verbs.utor,
				V.verbs.perfero,
				V.verbs.refero,
				V.adjectives.aequus,
				V.adjectives.iniquus,
				V.adjectives.honestus,
				V.adjectives.medius,
				V.adverbs.magnopere,
				V.adverbs.quo,
				V.adverbs.ubi,
				V.adverbs.unde,
				V.adverbs.contra,
				V.adverbs.satis,
				V.prepositions.apud,
				V.conjunctions.quin
			]
		},
		chapterEleven: {
			title: 'LTRL Ch 11',
			deck: [
				V.nouns.audacia,
				V.nouns.campus,
				V.nouns.castra,
				V.nouns.murus,
				V.nouns.paulum,
				V.nouns.signum,
				V.nouns.telum,
				V.nouns.ignis,
				V.nouns.imperator,
				V.nouns.legio,
				V.nouns.lux,
				V.nouns.maiores,
				V.nouns.sensus,
				V.idioms['prima luce'],
				V.idioms['castra ponere'],
				V.idioms['castra movere'],
				V.verbs.arbitror,
				V.verbs.puto,
				V.verbs.soleo,
				V.verbs.credo,
				V.verbs.iacio,
				V.verbs.eicio,
				V.verbs.loquor,
				V.verbs.invenio,
				V.verbs.scio,
				V.verbs.nescio,
				V.verbs.pereo,
				V.adjectives.longus,
				V.adjectives.summus,
				V.adjectives.brevis,
				V.adjectives.sapiens,
				V.adjectives.similis,
				V.adjectives.dissimilis,
				V.adverbs.diu,
				V.adverbs.longe,
				V.adverbs.parum,
				V.adverbs.primum,
				V.idioms['quam primum'],
				V.adverbs.quam,
				V.conjunctions.igitur
			]
		},
		LLChaptersOneToTen: {
			title: 'LL Ch 1-10',
			deck: [

			]
		},
		nouns: {
			title: 'Nouns',
			deck: (() => {
				var ret = [];
				for (var i in V.nouns)
					ret.push(V.nouns[i]);
				return ret;
			})()
		},
		verbs: {
			title: 'Verbs',
			deck: (() => {
				var ret = [];
				for (var i in V.verbs)
					ret.push(V.verbs[i]);
				return ret;
			})()
		},
		pronouns: {
			title: 'Pronouns',
			deck: (() => {
				var ret = [];
				for (var i in V.pronouns)
					ret.push(V.pronouns[i]);
				return ret;
			})()
		},
		adjectives: {
			title: 'Adjectives',
			deck: (() => {
				var ret = [];
				for (var i in V.adjectives)
					ret.push(V.adjectives[i]);
				return ret;
			})()
		},
		conjunctions: {
			title: 'Conjunctions',
			deck: (() => {
				var ret = [];
				for (var i in V.conjunctions)
					ret.push(V.conjunctions[i]);
				return ret;
			})()
		},
		prepositions: {
			title: 'Preposition',
			deck: (() => {
				var ret = [];
				for (var i in V.prepositions)
					ret.push(V.prepositions[i]);
				return ret;
			})()
		},
		other: {
			title : 'Other',
			deck: (() => {
				var ret = [];
				for (var i in V.other)
					ret.push(V.other[i]);
				return ret;
			})()
		},
		syntax: {
			title: 'Syntax',
			deck: (() => {
				var ret = [];
				for (var i in V.syntax)
					ret.push(V.syntax[i]);
				return ret;
			})()
		},
		names: {
			title: 'Names',
			deck: [
				V.nouns.Iuppiter,
				V.nouns.Iuno,
				V.nouns.Neptunus,
				V.nouns.Dis,
				V.nouns.Ceres,
				V.nouns.Vesta,
				V.nouns.Venus,
				V.nouns.Amor,
				V.nouns.Cupido,
				V.nouns.Apollo,
				V.nouns.Diana,
				V.nouns.Minerva,
				V.nouns.Mars,
				V.nouns.Mercurius,
				V.nouns.Vulcanus,
				V.nouns.Bacchus,
				V.nouns.Liber,
				V.nouns.Romulus,
				V.nouns.Remus,
				V.nouns.Italia,
				V.nouns.Aulus,
				V.nouns.Appius,
				V.nouns.Gaius,
				V.nouns.Gnaeus,
				V.nouns.Decimus,
				V.nouns.Lucius,
				V.nouns.Marcus,
				V.nouns.Manius,
				V.nouns.Publius,
				V.nouns.Quintus,
				V.nouns.Sextus,
				V.nouns.Servius,
				V.nouns.Spurius,
				V.nouns.Titus,
				V.nouns.Tiberius,
				V.nouns.Graecia,
				V.nouns.Ilium,
				V.nouns.Troia,
				V.nouns.Iulia,
				V.nouns.Livia,
				V.nouns.Sicilia
			]
		},
		irregularVerbs: {
			title: 'Irregular Verbs',
			deck: [
				V.verbs.sum,
				V.verbs.possum,
				V.verbs.eo,
				V.verbs.fero,
				V.verbs.memini,
				V.verbs.odi
			]
		}
	};



// Morphology Table
	function MorphologyTable(word) {

		var persons = ['first', 'second', 'third'],
				numbers = ['singular', 'plural'],
				tenses  = ['present', 'imperfect', 'future', 'perfect', 'pluperfect', 'future perfect'],
				voices  = ['active', 'passive'],
				moods   = ['indicative', 'subjunctive', 'imperative'/*, 'infinitive'*/],
				genders = ['masculine', 'feminine', 'neuter'],
				cases   = ['nominative', 'genitive', 'dative', 'accusative', 'ablative', 'vocative'];

		var table = '<table class="morphologyTable">';

		// Nouns, Personal Pronouns
		if (word.type.slice(0,4) === 'noun' ||
				word.type === 'pronoun personal' ||
				word.type === 'pronoun reflexive')
		{
			let declension = word.declension();

			let backgroundColor = '#c0cfe4';

			table += `<tr><td style="background-color: ${backgroundColor};" colspan="1"></td>`;
			for (let n = 0; n < numbers.length; n++)
				table += `<th style="background-color: ${backgroundColor};">${numbers[n]}</th>`;
			table += '</tr>';

			for (var c = 0; c < cases.length; c++) {
				table += '<tr>';
				table += `<th style="background-color: ${backgroundColor};">${cases[c]}</th>`;
				for (let n = 0; n < numbers.length; n++) {
					// check for special syntax
					let props = [cases[c], numbers[n]],
							ss    = specialSyntax(word, props);
					if (ss)
						table += `<td style="text-align: center; color: red; background-color: white;">`
							+ ss
							+ '</td>';
					else
						table += '<td style="text-align: center; background-color: white;">'
							+ declension[cases[c]][numbers[n]]
							+ '</td>';
				}
				table += '</tr>';
			}
		}

		// Adjectives
		if (word.type.slice(0,9) === 'adjective' ||
				word.type === 'pronoun relative' ||
				word.type === 'pronoun interrogative' ||
				word.type === 'pronoun indefinite')
		{

			var declension = word.declension();

			let backgroundColor       = '#c0cfe4',
					adverbBackgroundColor = '#c0e4c0';
			table += `<tr><td style="background-color: ${backgroundColor};" colspan="1" rowspan="2"></td>`;
			for (let n = 0; n < numbers.length; n++)
				table += `<th style="background-color: ${backgroundColor};" colspan="3">${numbers[n]}</th>`;
			table += '</tr>';

			table += '<tr>';
			for (let n = 0; n < numbers.length; n++)
				for (let g = 0; g < genders.length; g++)
					table += `<th style="background-color: ${backgroundColor};">${genders[g]}</th>`;
			table += '</tr>';
			for (let c = 0; c < cases.length; c++) {
				table += '<tr>';
				table += `<th style="background-color: ${backgroundColor};">${cases[c]}</th>`;
				for (let n = 0; n < numbers.length; n++) {
					for (let g = 0; g < genders.length; g++) {
						// check for special syntax
						let props = [cases[c], numbers[n], genders[g]],
								ss    = specialSyntax(word, props);
						if (ss)
							table += `<td style="text-align: center; color: red; background-color: white;">`
								+ ss
								+ '</td>';
						else
							table += '<td style="text-align: center; background-color: white;">'
								+ declension[cases[c]][numbers[n]][genders[g]]
								+ '</td>';
					}
				}
				table += '</tr>';
			}
			if (word.type.slice(0,9) === 'adjective' && declension.adverb) {
				table += `<tr><th style="background-color: ${adverbBackgroundColor};">adverb</th>`
					+ `<td colspan="6" style="${word.specialSyntax && word.specialSyntax.adverb ? 'color: red; ' : ''}text-align: center; background-color: white;">`
					+ declension.adverb
					+ '</td></tr>';
			}
		}

		// Verbs
		// ( v-- under construction)
		else if (word.type.slice(0,4) === 'verb')
		{

			let conjugation = word.conjugation();

			for (let m = 0; m < moods.length; m++) {

				let backgroundColor = m == 0 ? '#c0cfe4' : m == 1 ? '#c0e4c0' :
															m == 2 ? '#e4d4c0' : '#e2e4c0';
				let moodTenses = m == 0 ? tenses : m == 1 ? tenses.filter((t,i) => i % 3 != 2) :
												 m == 2 ? tenses.slice(0,1) : tenses.slice(0,1);

				table += '<tr>';
				table += `<th colspan="2" rowspan="2" style="background-color: ${backgroundColor};">` + moods[m] +'</th>';
				for (let n = 0; n < numbers.length; n++)
					table += `<th colspan="3" style="background-color: ${backgroundColor};">` + numbers[n] +'</th>';
				table += '</tr>';

				table += '<tr>';
				for (let n = 0; n < numbers.length; n++)
					for (let p = 0; p < persons.length; p++)
						table += `<th style="background-color: ${backgroundColor};">` + persons[p] + '</th>';
				table += '</tr>';

				for (let v = 0; v < voices.length; v++) {
					for (let t = 0; t < moodTenses.length; t++) {
						let propertyTense = moodTenses[t].replace(/ /g,'');
						table += '<tr>';
						if (t == 0) table += `<th rowspan="${moodTenses.length}"style="background-color: ${backgroundColor};">` + voices[v] + '</th>'
						table += `<th style="background-color: ${backgroundColor};">` + moodTenses[t] + `</th>`;
						for (let n = 0; n < numbers.length; n++) {
							for (let p = 0; p < persons.length; p++) {
								// check for special syntax
								let props = [moods[m], voices[v], propertyTense, numbers[n], persons[p]],
										ss    = specialSyntax(word, props);
								// if special syntax
								if (ss)
									table += `<td style="text-align: center; ${word.type == 'verb Irr' ? '' : 'color: red;'} background-color: white;">`
										+ ss
										+ '</td>';
								// if no special syntax
								else
									table += '<td style="text-align: center; background-color: white;">'
										+ conjugation[moods[m]][voices[v]][propertyTense][numbers[n]][persons[p]]
										+ '</td>';
							}
						}
						table += '</tr>';
					}
				}
				// for (var v = 0; v < voices.length; v++)
			}

			let backgroundColor = '#e2e4c0',
					nonFiniteTenses = ['present', 'perfect', 'future'],
					nonFiniteForms  = ['infinitive', 'participle'];
			table += '<tr>';
			table += `<th colspan="2" rowspan="2" style="background-color: ${backgroundColor};">non-finite forms</th>`;
			for (let v = 0; v < voices.length; v++)
				table += `<th colspan="3" style="background-color: ${backgroundColor};">` + voices[v] + '</th>'
			table += '</tr>';
			table += '<tr>';
			for (let v = 0; v < voices.length; v++)
				for (let t = 0; t < nonFiniteTenses.length; t++)
					table += `<th style="background-color: ${backgroundColor};">` + nonFiniteTenses[t] + '</th>';
			table += '</tr>';
			for (let f = 0; f < nonFiniteForms.length; f++){
				table += `<tr><th colspan="2" style="background-color: ${backgroundColor};">` + nonFiniteForms[f] + '</th>';
				for (let v = 0; v < voices.length; v++) {
					for (let t = 0; t < nonFiniteTenses.length; t++) {
						if (word.specialSyntax && word.specialSyntax[nonFiniteForms[f]]
							&& word.specialSyntax[nonFiniteForms[f]][voices[v]]
							&& word.specialSyntax[nonFiniteForms[f]][voices[v]][nonFiniteTenses[t]])
							table += `<td style="text-align: center; ${word.type == 'verb Irr' ? '' : 'color: red;'} background-color: white;">`
								+ word.specialSyntax[nonFiniteForms[f]][voices[v]][nonFiniteTenses[t]]
								+ '</td>';
						else
							table += '<td style="text-align: center; background-color: white;">'
								+ conjugation[nonFiniteForms[f]][voices[v]][nonFiniteTenses[t]]
								+ '</td>';
					}
				}
				table += '</tr>';
			}
		}

		table += '</table>';
		return table;

		function specialSyntax(word, props) {
			let ret = word.specialSyntax;
			for (let i = 0; i < props.length; i++) {
				if (!ret) break;
				ret = ret[props[i]];
			}
			return ret;
		}
	}

// Search
	function Search(text) {
		var ret = [];
		for (var wordType in  V) {
			for (var word in V[wordType]) {
				if (V[wordType][word].length < text.length) continue;
				var matchesWord = true;
				for (var i = 0; i < text.length; i++)
					if (V[wordType][word].statement[i] !== text[i]) matchesWord = false;
				if (matchesWord)
					ret.push(V[wordType][word]);
			}
		}
		return ret;
	}

// Num Words
function numWords(text) {
	var count = 0;
	for (var wordType in  V)
		for (var word in V[wordType])
			count++;
	console.log(count);
}



// SHIT I MIGHT NEED PROBABLY NOT

// var matrixToTable = (matrix, type) => {
// 	var table = '<table>';
// 	switch (type) {
// 		case 'declension':
// 			for (var r = 0; r < 7; r++) {
// 				table += '<tr>';
// 				if (r == 0){
// 					table += '<td></td><th>Singular</th><th>Plural</th>'
// 				}
// 				else {
// 					table += '<th>'
// 					if (r == 1) table += 'Nominative';
// 					if (r == 2) table += 'Genitive';
// 					if (r == 3) table += 'Dative';
// 					if (r == 4) table += 'Accusative';
// 					if (r == 5) table += 'Ablative';
// 					if (r == 6) table += 'Vocative';
// 					table += '</th>';
// 					table += '<td>';
// 					table += matrix[r-1][0];
// 					table += '</td>';
// 					table += '<td>';
// 					table += matrix[r-1][1];
// 					table += '</td>';
// 				}
// 				table += '</tr>';
// 			}
// 		break;
// 		case 'conjugation':

// 		break;
// 	}
// 	table += '</table>'
// 	return table;
// };



// matrixToTable(
// 	declensionToMatrix(
// 		decline(word.statement, word.type, word.specialSyntax)),
// 	'declension');
